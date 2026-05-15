package com.leakguard.database.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "alerts")
public class Alert {
    @Id
    private String id;
    private String type; // "LEAK" or "TAMPER"
    private String assetId;
    private String fileName;
    private String ownerEmail;
    private String walletAddress;
    private String leakedBy;
    private String similarityScore;
    private String message;
    private Date createdAt;

    public Alert() {
        this.createdAt = new Date();
    }
}
