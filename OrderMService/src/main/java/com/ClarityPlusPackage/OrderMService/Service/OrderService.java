package com.ClarityPlusPackage.OrderMService.Service;

import com.ClarityPlusPackage.OrderMService.Entity.LoginDetails;
import com.ClarityPlusPackage.OrderMService.Entity.Order;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Map;

public interface OrderService {


    List findOrderByOrderID(List<String> recipientDetailsList, String InstituteID);

    String saveOrder(Order[] orders);

    List<String> findOrderByDate(String date) throws ParseException;


    String loginGuard(String emailID, String password);

    String dataPopulate();
}
