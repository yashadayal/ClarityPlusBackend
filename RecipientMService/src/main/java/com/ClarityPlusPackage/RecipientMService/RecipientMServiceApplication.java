package com.ClarityPlusPackage.RecipientMService;

import com.ClarityPlusPackage.RecipientMService.Service.RecipientDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@ComponentScan(basePackages = {
		"com.ClarityPlusPackage.RecipientMService.Controller",
		"com.ClarityPlusPackage.RecipientMService.Service",
		"com.ClarityPlusPackage.RecipientMService.Repository",
		"com.ClarityPlusPackage.RecipientMService.Service.Implementation"
})
@EnableWebMvc
public class RecipientMServiceApplication implements CommandLineRunner {

	@Autowired
	RecipientDetailsService recipientDetailsService;

	public static void main(String[] args) {
		SpringApplication.run(RecipientMServiceApplication.class, args);
	}

	@Override
	public void run(String... args) throws InterruptedException {
		Thread.sleep(5000);
		String response = this.recipientDetailsService.dataPopulate();
		System.out.println(response);
	}
}
