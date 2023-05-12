package com.ClarityPlusPackage.OrderMService.Config;

import com.ClarityPlusPackage.OrderMService.Entity.Order;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class CustomOrderDeserializer extends JsonDeserializer<Order> {

    @Override
    public Order deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
        System.out.println("Inside deserializer");
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);

        // Extract values from JSON payload
        String orderId = node.get("OrderID").asText();
        String firstName = node.get("FirstName").asText();
        String lastName = node.get("LastName").asText();
        String dateofdeliverystr = node.get("DateOfDelivery").asText();
        String retailer = node.get("Retailer").asText();

        // Create Order object with extracted values

        Order order1 = new Order();

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        try{
            Date dateofdelivery = formatter.parse(dateofdeliverystr);
            order1.setDateOfDelivery(dateofdelivery);
        }catch(ParseException e){
            e.printStackTrace();
        }
        order1.setOrderID(orderId);
        order1.setFirstName(firstName);
        order1.setLastName(lastName);
        order1.setRetailer(retailer);
        System.out.println("Outside deserializer");
        return order1;
    }
}
