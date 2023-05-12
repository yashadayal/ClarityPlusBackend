package com.ClarityPlusPackage.RecipientMService.Entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name="logindetails")
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Builder
public class LoginDetails {

    @Id
    @Column(name = "EmailID")
    String EmailID;
    @Column(nullable=false,name="Password")
    String Password;
}
