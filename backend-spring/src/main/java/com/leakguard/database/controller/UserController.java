package com.leakguard.database.controller;

import com.leakguard.database.model.User;
import com.leakguard.database.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userService.saveOrUpdate(user);
    }

    @GetMapping("/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    @GetMapping("/wallet/{wallet}")
    public User getUserByWallet(@PathVariable String wallet) {
        return userService.getUserByWallet(wallet);
    }

    @PutMapping("/wallet")
    public User updateWallet(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String walletAddress = payload.get("walletAddress");
        return userService.updateWallet(email, walletAddress);
    }

    @PutMapping("/profile")
    public User updateProfile(@RequestBody Map<String, String> payload) {
        String identifier = payload.get("identifier");
        String name = payload.get("name");
        String bio = payload.get("bio");
        return userService.updateProfile(identifier, name, bio);
    }
}
