package com.condominio;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class MoradaDoSolApplication {

	public static void main(String[] args) {
		SpringApplication.run(MoradaDoSolApplication.class, args);
	}

}
