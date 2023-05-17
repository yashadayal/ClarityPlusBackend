package com.ClarityPlusPackage.RecipientMService.Repository;

import com.ClarityPlusPackage.RecipientMService.Entity.Recipient;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipientDetailsRepo extends JpaRepository<Recipient, String > {

    @Query("SELECT p.OrderID FROM Recipient p WHERE p.InstituteID = :instituteId AND p.Received = false")
    List<String> findRecipientDetailsDataByInstituteId(@Param("instituteId") String instituteId);

    @Query("SELECT p.OrderID, p.RecipientFirstName, p.Retailer,p.Received FROM Recipient p WHERE p.InstituteID = :instituteId")
    List<String> findAllRecipientDetailsByInstituteId(@Param("instituteId") String instituteID);

    @Query("SELECT distinct p.PersonalEmailID FROM Recipient p WHERE p.InstituteID = :instituteId")
    String findPersonalEmailIDByInstituteID(@Param("instituteId")String instituteID);

    @Query("SELECT p FROM Recipient p where p.InstituteID = :instituteId")
    List<Recipient> findRecipientByInstituteID(@Param("instituteId") String InstituteID);

    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE recipientdetails SET otp = :otp WHERE instituteid = :instituteID ", nativeQuery = true)
    @Transactional
    void saveByInstituteID(@Param("otp") int otp, @Param("instituteID") String instituteID);

    @Query("SELECT distinct p.OTP FROM Recipient p where p.InstituteID = :instituteId")
    int findOtpByInstituteID(@Param("instituteId") String instituteID);

    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE recipientdetails SET received = true WHERE instituteid = :instituteID ", nativeQuery = true)
    @Transactional
    void makeAsReceived(@Param("instituteID") String instituteID);

    @Query("select ld.EmailID from LoginDetails ld where ld.EmailID = :emailID")
    String findByEmailID(@Param("emailID") String emailID);

    @Query("select ld.Password from LoginDetails ld where ld.EmailID = :emailExistOrNot")
    String findPasswordByEmailID(@Param("emailExistOrNot") String emailExistOrNot);
}
