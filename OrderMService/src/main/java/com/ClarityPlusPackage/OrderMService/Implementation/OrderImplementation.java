package com.ClarityPlusPackage.OrderMService.Implementation;

import com.ClarityPlusPackage.OrderMService.Entity.LoginDetails;
import com.ClarityPlusPackage.OrderMService.Entity.Order;
import com.ClarityPlusPackage.OrderMService.Repository.LoginRepo;
import com.ClarityPlusPackage.OrderMService.Repository.OrderRepo;
import com.ClarityPlusPackage.OrderMService.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Service
public class OrderImplementation implements OrderService {

    private static final Logger logger = LogManager.getLogger(OrderImplementation.class);

    @Autowired
    public
    OrderRepo orderRepo;

    @Autowired
    LoginRepo loginRepo;

    @Override
    public List<String> findOrderByOrderID(List<String> recipientDetailsList, String InstituteID) {
        System.out.println("Inside Implementation");
        List<String> orderExistOrNot = new ArrayList<>();
        if(recipientDetailsList.isEmpty())
        {
            logger.info("No pending orders");
            orderExistOrNot.add("There is no pending orders for InstituteID "+InstituteID+". If there is any order yet to receive first fill the form for corresponding orderID.");
            return orderExistOrNot;
        }
        logger.info("Checking orderIDs in recipient are there in order or not");
        for(String orderID : recipientDetailsList)
        {
            //take one orderID came from recipient and check it if it exists here or not
            if(this.orderRepo.findOrderByOrderID(orderID) == null)
                orderExistOrNot.add("The order ID "+orderID+" has not been received in campus yet.\n Please try again after order expected delivery date.");
            else
                orderExistOrNot.add(orderID);
        }
        System.out.println("Outside Implementation");
        return orderExistOrNot;
    }

    @Override
    public String saveOrder(Order[] orders)
    {
        for(Order order:orders)
            this.orderRepo.save(order);
        logger.info("Saved orders received in campus");
        return "Orders saved successfully!";
    }

    @Override
    public List<String> findOrderByDate(String date) throws ParseException {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date stringToDate = dateFormat.parse(date);
        List<String> logs = this.orderRepo.findOrdersByDate(stringToDate);
        logger.info("Fetched logs by delivered date");
        return logs;
    }

    @Override
    public String loginGuard(String emailID, String password) {
        String emailExistOrNot = this.orderRepo.findByEmailID(emailID);
        System.out.println(emailExistOrNot);
        if(emailExistOrNot == null) {
            logger.info("Email ID does not exist");
            return "EmailID does not exist. \n Re-check the emailID or contact the admin.";
        }
        String passwordWithEmailID = this.orderRepo.findPasswordByEmailID(emailExistOrNot);
        if(!passwordWithEmailID.equals(password)) {
            logger.info("Invalid Login Credentials");
            return "Invalid Login";
        }
        logger.info("Valid Login");
        return "Valid Login";
    }

    @Override
    public String dataPopulate() {
        LoginDetails details1 = new LoginDetails("guard1@gmail.com","xyz123");
        this.loginRepo.save(details1);
        LoginDetails details2 = new LoginDetails("guard2@gmail.com","abc123");
        this.loginRepo.save(details2);
        logger.info("Guard Details Registered!");
        return "Guard Details Registered!";
    }
}
