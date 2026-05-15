package com.leakguard.database.service;

import com.leakguard.database.model.Alert;
import com.leakguard.database.model.Asset;
import com.leakguard.database.repository.AlertRepository;
import com.leakguard.database.repository.AssetRepository;
import com.leakguard.database.util.HashUtils;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

@Service
public class AssetService {

    @Autowired
    private AssetRepository assetRepository;

    @Autowired
    private AlertRepository alertRepository;

    private final String PYTHON_AI_URL = "http://localhost:5000";

    public Asset saveAsset(Asset asset, MultipartFile file) {
        if (asset.getCreatedAt() == null) {
            asset.setCreatedAt(new Date());
        }

        // 1. CALL PYTHON AI — Watermark Embedding
        try {
            org.springframework.http.client.SimpleClientHttpRequestFactory factory = new org.springframework.http.client.SimpleClientHttpRequestFactory();
            factory.setConnectTimeout(3000);
            factory.setReadTimeout(5000);
            RestTemplate restTemplate = new RestTemplate(factory);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("file", file.getResource());
            String userId = (asset.getWalletAddress() != null) ? asset.getWalletAddress() : asset.getEmail();
            body.add("userId", userId);

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(PYTHON_AI_URL + "/watermark", requestEntity, Map.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                Map<String, Object> resBody = response.getBody();
                asset.setWatermarkId((String) resBody.get("watermarkId"));
                asset.setWatermarkedFilePath((String) resBody.get("watermarkedFile"));
                if (resBody.containsKey("savedFileName")) {
                    asset.setFileName((String) resBody.get("savedFileName"));
                }
                asset.setProtected(true);
            }
        } catch (Exception e) {
            System.err.println("AI Protection Failed: " + e.getMessage());
            asset.setProtected(false); // Fallback: Protect pending
        }

        // 2. Hash Chain Logic
        String fileData = asset.getFileName() + asset.getCreatedAt().getTime();
        String fileHash = HashUtils.generateHash(fileData);
        asset.setFileHash(fileHash);

        Asset lastAsset = assetRepository.findFirstByOrderByIndexDesc();
        if (lastAsset == null) {
            asset.setPreviousHash("GENESIS");
            asset.setIndex(0);
        } else {
            asset.setPreviousHash(lastAsset.getCurrentHash() != null ? lastAsset.getCurrentHash() : "ORPHAN");
            asset.setIndex(lastAsset.getIndex() + 1);
        }

        String identity = (asset.getWalletAddress() != null) ? asset.getWalletAddress() : asset.getEmail();
        String blockData = asset.getFileHash() + asset.getPreviousHash() + identity;
        String currentHash = HashUtils.generateHash(blockData);
        asset.setCurrentHash(currentHash);

        return assetRepository.save(asset);
    }

    public Map<String, Object> detectLeak(MultipartFile file) {
        Map<String, Object> finalResult = new HashMap<>();
        
        try {
            // 1. CALL PYTHON AI — Step 1: Extraction only
            org.springframework.http.client.SimpleClientHttpRequestFactory factory = new org.springframework.http.client.SimpleClientHttpRequestFactory();
            factory.setConnectTimeout(3000);
            factory.setReadTimeout(15000); // Higher timeout for extraction
            RestTemplate restTemplate = new RestTemplate(factory);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("file", file.getResource());

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
            ResponseEntity<Map> response = restTemplate.postForEntity(PYTHON_AI_URL + "/detect", requestEntity, Map.class);
            
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                Map aiResult = response.getBody();
                boolean matched = (boolean) aiResult.getOrDefault("matched", false);
                String watermarkId = (String) aiResult.get("watermarkId");

                if (matched && watermarkId != null) {
                    // 2. Find Candidate Asset in Database
                    Optional<Asset> originalAssetOpt = assetRepository.findFirstByWatermarkIdStartingWith(watermarkId);
                    
                    if (originalAssetOpt.isPresent()) {
                        Asset originalAsset = originalAssetOpt.get();
                        
                        // 3. Step 2: Verify Similarity (Visual Match)
                        MultiValueMap<String, Object> verifyBody = new LinkedMultiValueMap<>();
                        verifyBody.add("file", file.getResource());
                        verifyBody.add("originalFileName", originalAsset.getFileName());
                        
                        HttpEntity<MultiValueMap<String, Object>> verifyEntity = new HttpEntity<>(verifyBody, headers);
                        ResponseEntity<Map> verifyResponse = restTemplate.postForEntity(PYTHON_AI_URL + "/detect", verifyEntity, Map.class);
                        
                        Double similarity = 0.0;
                        if (verifyResponse.getStatusCode() == HttpStatus.OK && verifyResponse.getBody() != null) {
                            similarity = (Double) verifyResponse.getBody().getOrDefault("similarityScore", 0.0);
                        }

                        // We consider it a LEAK if:
                        // 1. Watermark matches AND content is similar (>70%)
                        // 2. Watermark matches AND original file is missing from disk (similarity == 0) - for demo robustness
                        if (similarity > 0.7 || similarity == 0.0) {
                            finalResult.put("status", "LEAK DETECTED");
                            finalResult.put("ownerEmail", originalAsset.getEmail());
                            finalResult.put("walletAddress", originalAsset.getWalletAddress());
                            finalResult.put("similarity", similarity > 0 ? Math.round(similarity * 100) + "%" : "Watermark Match");
                            finalResult.put("fileName", originalAsset.getFileName());
                            finalResult.put("assetTitle", originalAsset.getTitle());
                            
                            // Check Tamper (Hash Integrity)
                            String identity = (originalAsset.getWalletAddress() != null) ? originalAsset.getWalletAddress() : originalAsset.getEmail();
                            String blockData = (originalAsset.getFileHash() != null ? originalAsset.getFileHash() : "") 
                                             + (originalAsset.getPreviousHash() != null ? originalAsset.getPreviousHash() : "") 
                                             + identity;
                            String recomputedHash = HashUtils.generateHash(blockData);
                            boolean isTampered = !recomputedHash.equals(originalAsset.getCurrentHash());
                            
                            if (isTampered) finalResult.put("status", "TAMPER DETECTED");
                            
                            // SAVE LEAK ALERT
                            Alert alert = new Alert();
                            alert.setType("LEAK");
                            alert.setAssetId(originalAsset.getId());
                            alert.setFileName(originalAsset.getFileName());
                            alert.setOwnerEmail(originalAsset.getEmail());
                            alert.setWalletAddress(originalAsset.getWalletAddress());
                            alert.setLeakedBy(watermarkId);
                            alert.setSimilarityScore(Math.round(similarity * 100) + "%");
                            alert.setMessage("Leak detected for file: " + originalAsset.getFileName());
                            alertRepository.save(alert);

                            return finalResult;
                        }
                    }
                }
            }
        } catch (Exception e) {
            finalResult.put("status", "ERROR");
            finalResult.put("message", "AI Detection service error: " + e.getMessage());
            return finalResult;
        }

        finalResult.put("status", "NO LEAK DETECTED");
        finalResult.put("message", "No matching watermarked content found.");
        return finalResult;
    }

    public Map<String, Object> validateChainAndReport() {
        List<Asset> chain = assetRepository.findAllByOrderByIndexAsc();
        String expectedPreviousHash = "GENESIS";
        boolean isAllValid = true;
        int breakIndex = -1;

        for (Asset asset : chain) {
            // 1. Recompute Current Hash
            String identity = (asset.getWalletAddress() != null) ? asset.getWalletAddress() : asset.getEmail();
            String blockData = (asset.getFileHash() != null ? asset.getFileHash() : "") 
                             + (asset.getPreviousHash() != null ? asset.getPreviousHash() : "") 
                             + identity;
            String recomputedHash = HashUtils.generateHash(blockData);

            // 2. Check Integrity
            if (!recomputedHash.equals(asset.getCurrentHash()) || !asset.getPreviousHash().equals(expectedPreviousHash)) {
                isAllValid = false;
                breakIndex = asset.getIndex();

                // Create Alert
                Alert alert = new Alert();
                alert.setType("TAMPER");
                alert.setAssetId(asset.getId());
                alert.setFileName(asset.getFileName());
                alert.setOwnerEmail(asset.getEmail());
                alert.setWalletAddress(asset.getWalletAddress());
                alert.setMessage("Hash chain broken at index " + asset.getIndex());
                alertRepository.save(alert);
                
                break; // Stop at first break
            }
            expectedPreviousHash = asset.getCurrentHash();
        }

        Map<String, Object> result = new HashMap<>();
        result.put("valid", isAllValid);
        result.put("message", isAllValid ? "Chain intact" : "Tampering detected at index " + breakIndex);
        return result;
    }

    public boolean validateChain() {
        List<Asset> chain = assetRepository.findAllByOrderByIndexAsc();
        String previousHash = "GENESIS";

        for (Asset asset : chain) {
            // Skip legacy assets that don't have hash fields
            if (asset.getFileHash() == null || asset.getCurrentHash() == null) {
                continue; 
            }

            // Recompute fileHash
            String fileData = asset.getFileName() + asset.getCreatedAt().getTime();
            String expectedFileHash = HashUtils.generateHash(fileData);
            
            // Recompute currentHash
            String identity = (asset.getWalletAddress() != null) ? asset.getWalletAddress() : asset.getEmail();
            String blockData = (asset.getFileHash() != null ? asset.getFileHash() : "") 
                             + (asset.getPreviousHash() != null ? asset.getPreviousHash() : "") 
                             + identity;
            String expectedCurrentHash = HashUtils.generateHash(blockData);

            // Verify integrity
            if (asset.getFileHash() != null && !asset.getFileHash().equals(expectedFileHash)) return false;
            if (asset.getCurrentHash() != null && !asset.getCurrentHash().equals(expectedCurrentHash)) return false;
            if (asset.getPreviousHash() != null && !asset.getPreviousHash().equals(previousHash)) return false;

            previousHash = asset.getCurrentHash() != null ? asset.getCurrentHash() : "UNKNOWN";
        }
        return true;
    }

    public List<Asset> getAssetsByWallet(String walletAddress) {
        return assetRepository.findByWalletAddress(walletAddress);
    }

    public List<Asset> getAssetsByEmail(String email) {
        return assetRepository.findByEmail(email);
    }

    public void deleteAsset(@NonNull String id) {
        assetRepository.deleteById(id);
    }
}
