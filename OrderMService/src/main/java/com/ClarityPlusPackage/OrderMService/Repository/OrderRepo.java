package com.ClarityPlusPackage.OrderMService.Repository;

import com.ClarityPlusPackage.OrderMService.Entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface OrderRepo extends JpaRepository<Order, String> {

    @Query("SELECT p.OrderID FROM Order p WHERE p.OrderID = :orderID")
    String findOrderByOrderID(@Param("orderID")String orderID);

    @Query("SELECT o.OrderID FROM Order o")
    List<String> getAllOrderIDByInstituteID();

    @Query("SELECT o.OrderID, o.FirstName, o.LastName, o.Retailer from Order o where o.DateOfDelivery = :date order by o.DateOfDelivery DESC")
    List<String> findOrdersByDate(@Param("date") Date date);

    @Query("select ld.EmailID from LoginDetails ld where ld.EmailID = :emailID")
    String findByEmailID(@Param("emailID") String emailID);

    @Query("select ld.Password from LoginDetails ld where ld.EmailID = :emailExistOrNot")
    String findPasswordByEmailID(@Param("emailExistOrNot") String emailExistOrNot);
}
