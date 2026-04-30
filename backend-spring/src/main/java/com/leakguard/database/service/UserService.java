package com.leakguard.database.service;

import com.leakguard.database.model.User;
import com.leakguard.database.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User saveOrUpdate(User user) {
        User existingUser = null;
        if (user.getEmail() != null) {
            existingUser = userRepository.findByEmail(user.getEmail());
        } else if (user.getWalletAddress() != null) {
            existingUser = userRepository.findByWalletAddress(user.getWalletAddress());
        }

        if (existingUser != null) {
            if (user.getName() != null) existingUser.setName(user.getName());
            if (user.getPhoto() != null) existingUser.setPhoto(user.getPhoto());
            if (user.getBio() != null) existingUser.setBio(user.getBio());
            if (user.getLoginType() != null) existingUser.setLoginType(user.getLoginType());
            if (user.getWalletAddress() != null) existingUser.setWalletAddress(user.getWalletAddress());
            if (user.getEmail() != null) existingUser.setEmail(user.getEmail());
            return userRepository.save(existingUser);
        }
        return userRepository.save(user);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User getUserByWallet(String walletAddress) {
        return userRepository.findByWalletAddress(walletAddress);
    }

    public User updateWallet(String email, String walletAddress) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            user.setWalletAddress(walletAddress);
            return userRepository.save(user);
        }
        return null;
    }

    public User updateProfile(String identifier, String name, String bio) {
        User user = userRepository.findByEmail(identifier);
        if (user == null) {
            user = userRepository.findByWalletAddress(identifier);
        }
        
        if (user != null) {
            if (name != null) user.setName(name);
            if (bio != null) user.setBio(bio);
            return userRepository.save(user);
        }
        return null;
    }
}
