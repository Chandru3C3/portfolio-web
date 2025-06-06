package com.mail.send;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@ComponentScan(basePackages = { "com.mail.send", "com.mail.dto" })
public class MailApplication {

	public static void main(String[] args) {
		SpringApplication.run(MailApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/**") // Apply CORS to all /api endpoints
						.allowedOrigins("http://localhost:4200", "https://chandru3c3.github.io") // Allow your Angular
																									// origins
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow all common methods
						.allowedHeaders("*") // Allow all headers
						.allowCredentials(true) // Allow cookies and authentication headers
						.maxAge(3600); // How long the preflight response can be cached (in seconds)
			}
		};

	}

}
