package com.ClarityPlusPackage.RecipientMService.DTO;


import com.ClarityPlusPackage.RecipientMService.Config.CustomRecipientDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@JsonDeserialize(using = CustomRecipientDeserializer.class)
public class RecipientDetailsDTO {

    String OrderID;
    String InstituteID;
    String RecipientFirstName;
    String RecipientLastName;
    String RecipientPhoneNumber;
    String PersonalEmailID;
    String Retailer;
}
