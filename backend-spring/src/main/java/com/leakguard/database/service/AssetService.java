package com.leakguard.database.service;

import com.leakguard.database.model.Asset;
import com.leakguard.database.repository.AssetRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class AssetService {

    private final AssetRepository assetRepository;

    public AssetService(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    public Asset saveAsset(Asset asset) {
        if (asset.getCreatedAt() == null) {
            asset.setCreatedAt(new Date());
        }
        return assetRepository.save(asset);
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
