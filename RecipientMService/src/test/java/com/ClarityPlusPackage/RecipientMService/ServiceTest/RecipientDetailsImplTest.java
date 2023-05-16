package com.ClarityPlusPackage.RecipientMService.ServiceTest;

import com.ClarityPlusPackage.RecipientMService.Repository.RecipientDetailsRepo;
import com.ClarityPlusPackage.RecipientMService.Service.Implementation.RecipientDetailsImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class RecipientDetailsImplTest {

    @Mock
    RecipientDetailsRepo recipientDetailsRepo;

    @InjectMocks
    private RecipientDetailsImpl recipientDetails;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSearchByInstituteID() {
        String instituteID = "MT2022137";
        List<String> mockRecipientDetailsList = new ArrayList<>();
        //For a given instituteID, there are 2 following orders
        mockRecipientDetailsList.add("AWS123");
        mockRecipientDetailsList.add("MYN567");
        when(recipientDetailsRepo.findRecipientDetailsDataByInstituteId(instituteID)).thenReturn(mockRecipientDetailsList);

        List<String> result = recipientDetails.searchByInstituteID(instituteID);

        assertEquals(2, result.size());
        assertEquals("AWS123", result.get(0));
        assertEquals("MYN567", result.get(1));
    }
}
