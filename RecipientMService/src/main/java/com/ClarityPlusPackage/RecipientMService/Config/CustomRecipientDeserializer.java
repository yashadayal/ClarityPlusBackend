package com.ClarityPlusPackage.RecipientMService.Config;

import com.ClarityPlusPackage.RecipientMService.DTO.RecipientDetailsDTO;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import java.io.IOException;


public class CustomRecipientDeserializer extends JsonDeserializer<RecipientDetailsDTO> {

    @Override
    public RecipientDetailsDTO deserialize(JsonParser jsonParser, DeserializationContext deserializationContext)
            throws IOException, JsonProcessingException {
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);

        // Extract values from JSON payload
        String orderId = node.get("OrderID").asText();
        String instituteId = node.get("InstituteID").asText();
        String recipientFirstName = node.get("RecipientFirstName").asText();
        String recipientLastName = node.get("RecipientLastName").asText();
        String recipientPhoneNumber = node.get("RecipientPhoneNumber").asText();
        String retailer = node.get("Retailer").asText();
        String personalEmailId=node.get("PersonalEmailID").asText();
        //boolean received = node.has("Received") ? node.get("Received").asBoolean() : false;

        // Create Order object with extracted values
        RecipientDetailsDTO order = new RecipientDetailsDTO();
        order.setOrderID(orderId);
        order.setInstituteID(instituteId);
        order.setRecipientFirstName(recipientFirstName);
        order.setRecipientLastName(recipientLastName);
        order.setRecipientPhoneNumber(recipientPhoneNumber);
        order.setRetailer(retailer);
        order.setPersonalEmailID(personalEmailId);
        //order.setReceived(received);

        return order;
    }
}
