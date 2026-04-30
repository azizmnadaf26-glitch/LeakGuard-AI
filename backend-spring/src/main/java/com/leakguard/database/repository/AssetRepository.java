package com.leakguard.database.repository;

import com.leakguard.database.model.Asset;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssetRepository extends MongoRepository<Asset, String> {
    List<Asset> findByWalletAddress(String walletAddress);
    List<Asset> findByEmail(String email);
}
