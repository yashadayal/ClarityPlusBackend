package com.ClarityPlusPackage.OrderMService;

import com.ClarityPlusPackage.OrderMService.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class OrderMServiceApplication implements CommandLineRunner {

	@Autowired
	OrderService orderService;

	public static void main(String[] args) {
		SpringApplication.run(OrderMServiceApplication.class, args);
	}

	@Override
	public void run(String... args) throws InterruptedException {
		Thread.sleep(5000);
		String response = this.orderService.dataPopulate();
		System.out.println(response);
	}
}
