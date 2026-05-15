package com.leakguard.database.controller;

import com.leakguard.database.model.Alert;
import com.leakguard.database.model.Asset;
import com.leakguard.database.repository.AlertRepository;
import com.leakguard.database.repository.AssetRepository;
import com.leakguard.database.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/assets")
@CrossOrigin(origins = "*")
public class AssetController {

    @Autowired
    private AssetRepository assetRepository;

    @Autowired
    private AlertRepository alertRepository;

    @Autowired
    private AssetService assetService;

    @GetMapping("/validate-chain")
    public ResponseEntity<Map<String, Object>> validateChain() {
        return ResponseEntity.ok(assetService.validateChainAndReport());
    }

    @GetMapping("/alerts/{ownerEmail}")
    public ResponseEntity<List<Alert>> getAlerts(@PathVariable String ownerEmail) {
        List<Alert> alerts = alertRepository.findAllByOwnerEmailOrderByCreatedAtDesc(ownerEmail);
        if (alerts.isEmpty()) {
            alerts = alertRepository.findAllByWalletAddressOrderByCreatedAtDesc(ownerEmail);
        }
        return ResponseEntity.ok(alerts);
    }

    @PostMapping("/")
    public Asset saveAsset(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("category") String category,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "walletAddress", required = false) String walletAddress,
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "ownerName", required = false) String ownerName) {

        Asset asset = new Asset();
        asset.setTitle(title);
        asset.setCategory(category);
        asset.setDescription(description);
        asset.setWalletAddress(walletAddress);
        asset.setEmail(email);
        asset.setOwnerName(ownerName);
        asset.setFileName(file.getOriginalFilename());

        return assetService.saveAsset(asset, file);
    }

    @GetMapping("/wallet/{wallet}")
    public List<Asset> getAssetsByWallet(@PathVariable String wallet) {
        return assetService.getAssetsByWallet(wallet);
    }

    @GetMapping("/email/{email}")
    public List<Asset> getAssetsByEmail(@PathVariable String email) {
        return assetService.getAssetsByEmail(email);
    }

    @DeleteMapping("/{id}")
    public void deleteAsset(@PathVariable @NonNull String id) {
        assetService.deleteAsset(id);
    }
}
