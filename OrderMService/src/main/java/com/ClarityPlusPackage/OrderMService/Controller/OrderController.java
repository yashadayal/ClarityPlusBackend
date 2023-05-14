package com.ClarityPlusPackage.OrderMService.Controller;

import com.ClarityPlusPackage.OrderMService.Entity.Order;
import com.ClarityPlusPackage.OrderMService.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.text.ParseException;
import java.util.List;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
@CrossOrigin(origins = "*",allowedHeaders = "*")
@RestController
@RequestMapping("/order")
public class OrderController {

    private static final Logger logger=LogManager.getLogger(OrderController.class);

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    OrderService orderService;

    @GetMapping("/ordersOfInstituteID/{InstituteID}/")
    public List<String> getOrderByInstituteID(@PathVariable("InstituteID") String InstituteID){
        System.out.println("Inside Controller");
        List<String> recipientDetailsList = this.restTemplate.getForObject("http://recipient-microservice/recipient/search/"+InstituteID+"/", List.class);
        logger.info("Getting OrderIDs that recipient has filled form for.");
        List<String> orderList = this.orderService.findOrderByOrderID(recipientDetailsList, InstituteID);
        logger.info("Getting OrderIDs that are in campus for given instituteID.");
        System.out.println("Outside Controller");
        return orderList;
    }

    @GetMapping("/emailOfInstituteID/{InstituteID}/")
    public String getEmailOfInstituteID(@PathVariable ("InstituteID") String InstituteID){
        System.out.println("Inside Controller");
        String emailID = this.restTemplate.getForObject("http://recipient-microservice/recipient/getEmailID/"+InstituteID+"/",String.class);
        logger.info("Fetching emailID from order MS to recipient for sending otp");
        System.out.println("Outside Controller");
        return emailID;
    }

    @GetMapping("/search/logsbyID/{InstituteID}/")
    public List<String> getLogsByInstituteID(@PathVariable("InstituteID") String InstituteID) {
        System.out.println("Inside Controller");
        List<String> logs = this.restTemplate.getForObject("http://recipient-microservice/recipient/search/logs/" + InstituteID + "/", List.class);
        logger.info("Fetching logs by institute ID from order MS to recipient MS");
        System.out.println("Outside Controller");
        return logs;
    }

    @GetMapping("/search/logsbydate/{date}/")
    public List<String> getLogsByDate(@PathVariable("date") String date) throws ParseException {
        System.out.println("Inside Controller");
        List<String> logs = this.orderService.findOrderByDate(date);
        logger.info("Fetching logs by delivered date from order MS");
        System.out.println("Outside Controller");
        return logs;
    }

    @PostMapping("/saveorderdata")
    public ResponseEntity<String> saveOrder(@RequestBody Order[] orders) {
        String success=this.orderService.saveOrder(orders);
        logger.info("Saving Orders received in campus");
        return ResponseEntity.ok(success);
    }

    @PostMapping("/verifyOtp/{InstituteID}/{otp}")
    public ResponseEntity<String> verifyOtp(@PathVariable("InstituteID") String InstituteID, @PathVariable("otp") int otp){
        String otpVerifyResponse = this.restTemplate.postForObject("http://recipient-microservice/recipient/checkotp/{InstituteID}/{otp}",null,String.class,InstituteID,otp);
        System.out.println(otpVerifyResponse);
        logger.info("Verifying OTP from order MS to recipient MS");
        return ResponseEntity.ok(otpVerifyResponse);
    }

    @PostMapping("/login/guard/{emailID}/{password}/")
    public ResponseEntity<String> loginGuard(@PathVariable("emailID") String emailID, @PathVariable("password") String password) {
        //to avoid writing custom deserialization logic
        //sending email and password as pathvariables as @RequestBody is receiving NULL
        String response = this.orderService.loginGuard(emailID,password);
        logger.info("Login Guard checking");
        return ResponseEntity.ok(response);
    }
}
