package com.leakguard.database.repository;

import com.leakguard.database.model.Alert;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface AlertRepository extends MongoRepository<Alert, String> {
    List<Alert> findAllByOwnerEmailOrderByCreatedAtDesc(String ownerEmail);
    List<Alert> findAllByWalletAddressOrderByCreatedAtDesc(String walletAddress);
}
