package com.ClarityPlusPackage.RecipientMService.Controller;


import com.ClarityPlusPackage.RecipientMService.DTO.RecipientDetailsDTO;
import com.ClarityPlusPackage.RecipientMService.Service.RecipientDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
@CrossOrigin(origins = "*",allowedHeaders = "*")
@RestController
@RequestMapping("/recipient")
public class RecipientDetailsController {

    private static final Logger logger = LogManager.getLogger(RecipientDetailsController.class);

    @Autowired
    private RecipientDetailsService recipientDetailsService;

    @GetMapping("/search/{instituteID}/")
    public ResponseEntity<List<String>> searchByInstituteID(@PathVariable("instituteID") String instituteID){
        System.out.println("Inside Recipient Controller");
        logger.info("Searching by Institute Id");
        return ResponseEntity.ok(this.recipientDetailsService.searchByInstituteID(instituteID));
    }

    @GetMapping("/search/logs/{instituteID}/")
    public ResponseEntity<List<String>> searchLogsByInstituteID(@PathVariable("instituteID") String instituteID){
        System.out.println("Inside Recipient Controller");
        logger.info("Getting all logs by Institute Id");
        return ResponseEntity.ok(this.recipientDetailsService.searchLogsByInstituteID(instituteID));
    }

    @PostMapping("/savedata")
    public ResponseEntity<String> saveData(@RequestBody RecipientDetailsDTO recipientDetailsDTO){
        System.out.println("Inside Recipient Controller");
        String success = this.recipientDetailsService.saveData(recipientDetailsDTO);
        logger.info("Saving user data");
        return ResponseEntity.ok(success);
    }

    @GetMapping("/getEmailID/{InstituteID}/")
    public ResponseEntity<String> getEmailIDByInstituteID(@PathVariable("InstituteID") String InstituteID)  {
        logger.info("Getting emailID to send OTP");
        return ResponseEntity.ok(this.recipientDetailsService.getEmailIDByInstituteID(InstituteID));
    }

    @PostMapping("/checkotp/{InstituteID}/{otp}")
    public ResponseEntity<String> checkOtp(@PathVariable("otp") int otp, @PathVariable("InstituteID") String InstituteID){
        logger.info("Checking OTP correct or not");
        return ResponseEntity.ok(this.recipientDetailsService.checkOtp(otp,InstituteID));
    }

    @PostMapping("/login/recipient/{emailID}/{password}/")
    public ResponseEntity<String> loginRecipient(@PathVariable("emailID") String emailID, @PathVariable("password") String password) {
        //to avoid writing custom deserialization logic
        //sending email and password as pathvariables as @RequestBody is receiving NULL
        String response = this.recipientDetailsService.loginRecipient(emailID,password);
        logger.info("Login Recipient checking");
        return ResponseEntity.ok(response);
    }
}
