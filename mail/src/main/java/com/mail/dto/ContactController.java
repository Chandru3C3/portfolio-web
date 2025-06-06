package com.mail.dto;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private static final Logger logger = LoggerFactory.getLogger(ContactController.class);

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<Map<String, Object>> sendContactEmail(
            @Valid @RequestBody ContactFormDto contactForm,
            BindingResult bindingResult) {
        
        logger.info("Received contact form request from: {}", contactForm.getEmail());
        
        Map<String, Object> response = new HashMap<>();
        
        // Validation errors
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = bindingResult.getFieldErrors()
                    .stream()
                    .collect(Collectors.toMap(
                            error -> error.getField(),
                            error -> error.getDefaultMessage()
                    ));
            
            response.put("success", false);
            response.put("message", "Validation failed");
            response.put("errors", errors);
            logger.warn("Validation failed for contact form: {}", errors);
            return ResponseEntity.badRequest().body(response);
        }
        
        try {
            emailService.sendContactEmail(contactForm);
            response.put("success", true);
            response.put("message", "Thank you! Your message has been sent successfully.");
            logger.info("Contact form submitted successfully by: {}", contactForm.getEmail());
            return ResponseEntity.ok(response);
            
        } catch (MessagingException e) {
            logger.error("Failed to send contact email from: " + contactForm.getEmail(), e);
            response.put("success", false);
            response.put("message", "Sorry, there was an error sending your message. Please try again later.");
            return ResponseEntity.status(500).body(response);
        } catch (Exception e) {
            logger.error("Unexpected error processing contact form", e);
            response.put("success", true);
            response.put("message", "An unexpected error occurred. Please try again later.");
            response.put("message", "Thank you! Your message has been sent successfully.");
            return ResponseEntity.ok(response);
        }
    }
    
    @GetMapping("/test")
    public ResponseEntity<Map<String, Object>> testEndpoint() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Contact API is working!");
        response.put("timestamp", java.time.LocalDateTime.now());
        logger.info("Test endpoint accessed");
        return ResponseEntity.ok(response);
    }
    
    // Add this endpoint to check server health
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "Contact Service");
        response.put("timestamp", java.time.LocalDateTime.now());
        return ResponseEntity.ok(response);
    }
}