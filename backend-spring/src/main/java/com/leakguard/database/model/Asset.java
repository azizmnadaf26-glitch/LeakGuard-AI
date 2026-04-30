package com.leakguard.database.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "assets")
public class Asset {

    @Id
    private String id;
    private String title;
    private String category;
    private String description;
    private String walletAddress;
    private String email;
    private String ownerName;
    private String fileName;
    private Date createdAt;
}
