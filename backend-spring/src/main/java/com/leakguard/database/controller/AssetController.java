package com.leakguard.database.controller;

import com.leakguard.database.model.Asset;
import com.leakguard.database.service.AssetService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assets")
@CrossOrigin(origins = "*")
public class AssetController {

    private final AssetService assetService;

    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }

    @PostMapping("/")
    public Asset saveAsset(@RequestBody Asset asset) {
        return assetService.saveAsset(asset);
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
    public void deleteAsset(@PathVariable String id) {
        assetService.deleteAsset(id);
    }
}
