package com.ClarityPlusPackage.RecipientMService.ControllerTest;

import com.ClarityPlusPackage.RecipientMService.Controller.RecipientDetailsController;
import com.ClarityPlusPackage.RecipientMService.Service.Implementation.EmailConfig;
import com.ClarityPlusPackage.RecipientMService.Service.RecipientDetailsService;
import com.ClarityPlusPackage.RecipientMService.ServiceTest.RecipientDetailsImplTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static net.bytebuddy.matcher.ElementMatchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.http.RequestEntity.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(RecipientDetailsController.class)
public class RecipientDetailsTest {

    @MockBean
    private RecipientDetailsService recipientDetailsService;

    @MockBean
    private JavaMailSender javaMailSender;

    @InjectMocks
    private RecipientDetailsController recipientDetailsController;

    @Autowired
    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSearchByInstituteID() throws Exception {
        String instituteID = "MT2022137";
        List<String> mockOrders = new ArrayList<>();
        //For a giving instituteID there are 2 following orders
        mockOrders.add("AWS123");
        mockOrders.add("MYN567");
        when(recipientDetailsService.searchByInstituteID(instituteID)).thenReturn(mockOrders);

        mockMvc.perform(get("/recipient/search/{instituteID}/",instituteID)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(2))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0]").value("AWS123"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1]").value("MYN567"));
    }

    @Test
    public void testSearchLogsByInstituteID() throws Exception {
        String InstituteID = "MT2022137";
        List<String> logsByInstituteID = Arrays.asList("AWS123,Yasha,Dayal,Amazon,False");
        when(recipientDetailsService.searchLogsByInstituteID(InstituteID)).thenReturn(logsByInstituteID);
        mockMvc.perform(get("/recipient/search/logs/{instituteID}/", InstituteID)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0]").value(logsByInstituteID.get(0)));

    }

    @Test
    public void testCheckOtp() throws Exception {
        int otp = 3452;
        String InstituteID = "MT2022137";
        when(recipientDetailsService.checkOtp(otp, InstituteID)).thenReturn("OTP Verified!");
        mockMvc.perform(MockMvcRequestBuilders.post("/recipient/checkotp/{InstituteID}/{otp}", InstituteID, otp)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("OTP Verified!"));
    }

    @Test
    public void testLoginRecipient() throws Exception {
        String emailID = "yasha@gmail.com";
        String password = "xyz123";
        when(recipientDetailsService.loginRecipient(emailID,password)).thenReturn("Valid Login");
        mockMvc.perform(MockMvcRequestBuilders.post("/recipient/login/recipient/{emailID}/{password}/", emailID, password)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("Valid Login"));
    }
}
