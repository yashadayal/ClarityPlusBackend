package com.ClarityPlusPackage.OrderMService.ServiceTest;

import com.ClarityPlusPackage.OrderMService.Entity.Order;
import com.ClarityPlusPackage.OrderMService.Implementation.OrderImplementation;
import com.ClarityPlusPackage.OrderMService.Repository.OrderRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class OrderImplTest {
    @Mock
    private OrderRepo orderRepo;

    private OrderImplementation orderImplementation;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        orderImplementation = new OrderImplementation();
        orderImplementation.orderRepo = orderRepo;
    }
    @Test
    void testFindOrderByOrderID() {
        List<String> recipientDetailsList = new ArrayList<>();
        recipientDetailsList.add("orderID1");
        recipientDetailsList.add("orderID2");

        when(orderRepo.findOrderByOrderID("orderID1")).thenReturn("orderID1");
        when(orderRepo.findOrderByOrderID("orderID2")).thenReturn(null);

        List<String> result = orderImplementation.findOrderByOrderID(recipientDetailsList, "InstituteID");

        verify(orderRepo, times(1)).findOrderByOrderID("orderID1");
        verify(orderRepo, times(1)).findOrderByOrderID("orderID2");
        assertEquals(2, result.size());
        assertEquals("orderID1", result.get(0));
        assertEquals("The order ID orderID2 has not been received in campus yet.\n Please try again after order expected delivery date.", result.get(1));
    }
    @Test
    void testSaveOrder() {
        Order[] orders = new Order[]{new Order(), new Order()};

        String result = orderImplementation.saveOrder(orders);

        verify(orderRepo, times(2)).save(any(Order.class));
        assertEquals("Orders saved successfully!", result);
    }

    @Test
    void testFindOrderByDate() throws Exception {
        String date = "2023-05-15";

        when(orderRepo.findOrdersByDate(any(Date.class))).thenReturn(new ArrayList<>());

        List<String> result = orderImplementation.findOrderByDate(date);

        verify(orderRepo, times(1)).findOrdersByDate(any(Date.class));
        assertEquals(0, result.size());

    }
    @Test
    void testLoginGuard() {
        String emailID = "guard1@gmail.com";
        String password = "xyz123";

        when(orderRepo.findByEmailID(emailID)).thenReturn(emailID);
        when(orderRepo.findPasswordByEmailID(emailID)).thenReturn(password);

        String result = orderImplementation.loginGuard(emailID, password);

        verify(orderRepo, times(1)).findByEmailID(emailID);
        verify(orderRepo, times(1)).findPasswordByEmailID(emailID);
        assertEquals("Valid Login", result);

        String emailID1 = "guard@gmail.com";
        String password1 = "xyz";

        when(orderRepo.findByEmailID(emailID1)).thenReturn(emailID1);
        when(orderRepo.findPasswordByEmailID(emailID1)).thenReturn(password1);

        String result1 = orderImplementation.loginGuard(emailID1, password1);

        verify(orderRepo, times(1)).findByEmailID(emailID1);
        verify(orderRepo, times(1)).findPasswordByEmailID(emailID1);
        assertEquals("Valid Login", result1);
    }
}
