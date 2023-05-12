package com.ClarityPlusPackage.RecipientMService.Repository;

import com.ClarityPlusPackage.RecipientMService.Entity.LoginDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepo extends JpaRepository<LoginDetails,String> {
}
