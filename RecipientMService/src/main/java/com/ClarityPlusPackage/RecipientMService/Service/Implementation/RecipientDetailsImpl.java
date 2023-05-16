package com.ClarityPlusPackage.RecipientMService.Service.Implementation;

import com.ClarityPlusPackage.RecipientMService.DTO.RecipientDetailsDTO;
import com.ClarityPlusPackage.RecipientMService.Entity.LoginDetails;
import com.ClarityPlusPackage.RecipientMService.Entity.Recipient;
import com.ClarityPlusPackage.RecipientMService.Repository.LoginRepo;
import com.ClarityPlusPackage.RecipientMService.Repository.RecipientDetailsRepo;
import com.ClarityPlusPackage.RecipientMService.Service.RecipientDetailsService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class RecipientDetailsImpl implements RecipientDetailsService {

    @Autowired
    EmailConfig emailConfig;

    @Autowired
    RecipientDetailsRepo recipientDetailsRepo;

    @Autowired
    LoginRepo loginRepo;


    public String getEmailIDByInstituteID(String instituteID) {
        System.out.println("Inside Implementation");
        String emailID = recipientDetailsRepo.findPersonalEmailIDByInstituteID(instituteID);
        sendMail(emailID,instituteID);
        return "OTP to sent linked emailID successfully!";
    }

    public void sendMail(String emailID, String instituteID)  {
        System.out.println("Inside sendMail");
        String subject = "OTP for Delivering package";
        Random random = new Random();
        int otp = random.nextInt(100000);
        List<Recipient> recipientList = this.recipientDetailsRepo.findRecipientByInstituteID(instituteID);
        for(Recipient recipient : recipientList)
        {
            recipientDetailsRepo.saveByInstituteID(otp,recipient.getInstituteID());
        }
        String text = "Your OTP is " + otp;
        System.out.println(text);
        emailConfig.sendOTPMail(emailID,subject,text);
        System.out.println("Outside Implementation");
    }

    @Override
    public List<String> searchByInstituteID(String instituteID) {
        System.out.println("Inside Impl");
        List<String> recipientDetailsList = this.recipientDetailsRepo.findRecipientDetailsDataByInstituteId(instituteID);
        System.out.println("Outside Impl");
        return recipientDetailsList;
    }

    @Override
    public List<String> searchLogsByInstituteID(String instituteID) {
        System.out.println("Inside Impl");
        List<String> recipientDetailsList = this.recipientDetailsRepo.findAllRecipientDetailsByInstituteId(instituteID);
        System.out.println("Outside Impl");
        return recipientDetailsList;
    }

    @Override
    public String saveData(RecipientDetailsDTO recipientDetailsDTO) {
        System.out.println("Inside savedata");
        Recipient recipient = mapRecipientDetailsDTOToEntity(recipientDetailsDTO);
        this.recipientDetailsRepo.save(recipient);
        System.out.println(recipient.getReceived());
        return "Order details saved successfully!";
    }

    @Override
    public String checkOtp(int otp, String instituteID) {
        int otpSaved = this.recipientDetailsRepo.findOtpByInstituteID(instituteID);
        if(otpSaved == otp) {
            List<Recipient> recipientList = this.recipientDetailsRepo.findRecipientByInstituteID(instituteID);
            for(Recipient recipient : recipientList)
            {
                recipientDetailsRepo.makeAsReceived(recipient.getInstituteID());
            }
            return "OTP Verified!";
        }
        return "OTP not verified!";
    }

    @Override
    public String loginRecipient(String emailID, String password) {
        String emailExistOrNot = this.recipientDetailsRepo.findByEmailID(emailID);
        System.out.println(emailExistOrNot);
        if(emailExistOrNot == null)
            return "EmailID does not exist. \n Re-check the emailID or contact the admin.";
        String passwordWithEmailID = this.recipientDetailsRepo.findPasswordByEmailID(emailExistOrNot);
        if(!passwordWithEmailID.equals(password))
            return "Invalid Login";
        return "Valid Login";
    }

    @Override
    public String dataPopulate() {
        LoginDetails details1 = new LoginDetails("yasha@gmail.com","xyz123");
        this.loginRepo.save(details1);
        LoginDetails details2 = new LoginDetails("aakanksha@gmail.com","abc123");
        this.loginRepo.save(details2);
        return "Recipient Details Registered!";
    }


    private Recipient mapRecipientDetailsDTOToEntity(RecipientDetailsDTO recipientDetailsDTO) {
        Recipient recipient = new Recipient();
        recipient.setOrderID(recipientDetailsDTO.getOrderID());
        recipient.setInstituteID(recipientDetailsDTO.getInstituteID());
        recipient.setRecipientFirstName(recipientDetailsDTO.getRecipientFirstName());
        recipient.setRecipientLastName(recipientDetailsDTO.getRecipientLastName());
        recipient.setRecipientPhoneNumber(recipientDetailsDTO.getRecipientPhoneNumber());
        recipient.setRetailer(recipientDetailsDTO.getRetailer());
        recipient.setPersonalEmailID(recipientDetailsDTO.getPersonalEmailID());
        recipient.setReceived(false);
        return recipient;
    }
}
