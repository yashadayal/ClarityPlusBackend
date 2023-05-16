package com.ClarityPlusPackage.OrderMService.ControllerTest;

import com.ClarityPlusPackage.OrderMService.Controller.OrderController;
import com.ClarityPlusPackage.OrderMService.Service.OrderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@WebMvcTest(OrderController.class)
public class OrderTest {

    @MockBean
    private RestTemplate restTemplate;

    @MockBean
    private OrderService orderService;

    @InjectMocks
    private OrderController orderController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetOrderByInstituteID() {
        String instituteID = "MT2022137";
        List<String> recipientDetailsList = new ArrayList<>();
        when(restTemplate.getForObject(eq("http://recipient-microservice/recipient/search/{InstituteID}/"), eq(List.class))).thenReturn(recipientDetailsList);
        List<String> orderList = new ArrayList<>();
        when(orderService.findOrderByOrderID(eq(recipientDetailsList), eq(instituteID))).thenReturn(orderList);
        List<String> result = orderController.getOrderByInstituteID(instituteID);
        assertEquals(orderList, result);
    }


    @Test
    void testGetEmailOfInstituteID() {
        String emailID = "yasha.dayal145@gmail.com";
        String InstituteID="MT2022137";
        when(restTemplate.getForObject(eq("http://recipient-microservice/recipient/getEmailID/"+InstituteID+"/"), eq(String.class))).thenReturn(emailID);
        String result = orderController.getEmailOfInstituteID(InstituteID);
        assertEquals(emailID, result);
    }
    @Test
    void testGetLogsByInstituteID() {
        String InstituteID="MT2022137";
        List<String> logs = Arrays.asList("AWS123,Yasha,Dayal,Amazon,False");
        when(restTemplate.getForObject("http://recipient-microservice/recipient/search/logs/"+InstituteID+"/", List.class)).thenReturn(logs);
        List<String> result = orderController.getLogsByInstituteID(InstituteID);
        assertEquals(logs, result);
    }
    @Test
    void testGetLogsByDate() throws ParseException {
        List<String> expectedLogs = Arrays.asList("AWS123,Yasha,Dayal,Amazon,False");
        when(orderService.findOrderByDate(anyString())).thenReturn(expectedLogs);
        List<String> result = orderController.getLogsByDate("2023-05-16");
        assertEquals(expectedLogs, result);
    }

    @Test
    void testVerifyOtp() {
        String InstituteID="MT2022137";
        int otp = 7033;
        String otpVerifyResponse = "OTP verified";
        when(restTemplate.postForObject("http://recipient-microservice/recipient/checkotp/{InstituteID}/{otp}", null, String.class, InstituteID, otp)).thenReturn(otpVerifyResponse);
        ResponseEntity<String> result = orderController.verifyOtp(InstituteID, otp);
        assertEquals(otpVerifyResponse, result.getBody());
        assertEquals(200, result.getStatusCodeValue());
    }
}
