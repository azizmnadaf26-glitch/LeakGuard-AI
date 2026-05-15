package com.leakguard.database.controller;

import com.leakguard.database.service.AssetService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.Map;

@RestController
@RequestMapping("/api/leak")
@CrossOrigin(origins = "*")
public class LeakController {

    private final AssetService assetService;

    public LeakController(AssetService assetService) {
        this.assetService = assetService;
    }

    @PostMapping("/detect")
    public Map<String, Object> detectLeak(@RequestParam("file") MultipartFile file) {
        return assetService.detectLeak(file);
    }
}
