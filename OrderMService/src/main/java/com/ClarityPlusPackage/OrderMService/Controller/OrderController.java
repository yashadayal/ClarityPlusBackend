package com.ClarityPlusPackage.OrderMService.Controller;

import com.ClarityPlusPackage.OrderMService.Entity.Order;
import com.ClarityPlusPackage.OrderMService.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.text.ParseException;
import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    OrderService orderService;

    @GetMapping("/ordersOfInstituteID/{InstituteID}/")
    public List<String> getOrderByInstituteID(@PathVariable("InstituteID") String InstituteID){
        System.out.println("Inside Controller");
        List<String> recipientDetailsList = this.restTemplate.getForObject("http://recipient-microservice/recipient/search/"+InstituteID+"/", List.class);
        List<String> orderList = this.orderService.findOrderByOrderID(recipientDetailsList, InstituteID);
        System.out.println("Outside Controller");
        return orderList;
    }

    @GetMapping("/emailOfInstituteID/{InstituteID}/")
    public String getEmailOfInstituteID(@PathVariable ("InstituteID") String InstituteID){
        System.out.println("Inside Controller");
        String emailID = this.restTemplate.getForObject("http://recipient-microservice/recipient/getEmailID/"+InstituteID+"/",String.class);
        System.out.println("Outside Controller");
        return emailID;
    }

    @GetMapping("/search/logsbyID/{InstituteID}/")
    public List<String> getLogsByInstituteID(@PathVariable("InstituteID") String InstituteID) {
        System.out.println("Inside Controller");
        List<String> logs = this.restTemplate.getForObject("http://recipient-microservice/recipient/search/logs/" + InstituteID + "/", List.class);
        System.out.println("Outside Controller");
        return logs;
    }

    @GetMapping("/search/logsbydate/{date}/")
    public List<String> getLogsByDate(@PathVariable("date") String date) throws ParseException {
        System.out.println("Inside Controller");
        List<String> logs = this.orderService.findOrderByDate(date);
        System.out.println("Outside Controller");
        return logs;
    }

    @PostMapping("/saveorderdata")
    public ResponseEntity<String> saveOrder(@RequestBody Order[] orders) {
        System.out.println(orders[0]);
        String success=this.orderService.saveOrder(orders);
        return ResponseEntity.ok(success);
    }

    @PostMapping("/verifyOtp/{InstituteID}/{otp}")
    public ResponseEntity<String> verifyOtp(@PathVariable("InstituteID") String InstituteID, @PathVariable("otp") int otp){
        String otpVerifyResponse = this.restTemplate.postForObject("http://recipient-microservice/recipient/checkotp/{InstituteID}/{otp}",null,String.class,InstituteID,otp);
        System.out.println(otpVerifyResponse);
        return ResponseEntity.ok(otpVerifyResponse);
    }

    @PostMapping("/login/guard/{emailID}/{password}/")
    public ResponseEntity<String> loginGuard(@PathVariable("emailID") String emailID, @PathVariable("password") String password) {
        //to avoid writing custom deserialization logic
        //sending email and password as pathvariables as @RequestBody is receiving NULL
        String response = this.orderService.loginGuard(emailID,password);
        return ResponseEntity.ok(response);
    }
}
