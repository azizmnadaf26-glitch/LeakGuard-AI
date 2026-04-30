package com.leakguard.database.repository;

import com.leakguard.database.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
    User findByWalletAddress(String walletAddress);
}
