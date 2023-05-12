package com.ClarityPlusPackage.RecipientMService.Service;

import com.ClarityPlusPackage.RecipientMService.DTO.RecipientDetailsDTO;

import java.util.List;

public interface RecipientDetailsService {
    List<String> searchByInstituteID(String InstituteId);

    List<String> searchLogsByInstituteID(String instituteID);

    String saveData(RecipientDetailsDTO recipientDetailsDTO);


    String getEmailIDByInstituteID(String instituteID);

    String checkOtp(int otp, String instituteID);

    String loginRecipient(String emailID, String password);

    String dataPopulate();
}
