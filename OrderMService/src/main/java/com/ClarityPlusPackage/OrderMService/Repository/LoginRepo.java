package com.ClarityPlusPackage.OrderMService.Repository;

import com.ClarityPlusPackage.OrderMService.Entity.LoginDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepo extends JpaRepository<LoginDetails, String> {

}
