package com.ClarityPlusPackage.RecipientMService.Entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="recipientdetails")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Builder
public class Recipient {

    @Id
    @Column(name = "OrderID")
    String OrderID;

    @Column(name = "InstituteID")
    String InstituteID;

    @Column(nullable=false,name="RecipientFirstName")
    String RecipientFirstName;

    @Column(nullable=false,name="RecipientLastName")
    String RecipientLastName;

    @Column(nullable=false,name="RecipientPhoneNumber")
    String RecipientPhoneNumber;

    @Column(nullable=false,name="PersonalEmailID")
    String PersonalEmailID;

    @Column(nullable=false,name="Retailer")
    String Retailer;

    @Column(nullable=false,name="Received")
    Boolean Received;

    @Column(nullable = true,name="OTP")
    int OTP;

    @PrePersist
    public void setDefaultValues() {
        if (Received == null) {
            Received = false;
        }
        System.out.println("Setting default values...");
    }
}
