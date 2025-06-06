// 6. Exception Handler (Optional)
package com.mail.dto;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.mail.MessagingException;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
    
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    
    @ExceptionHandler(MessagingException.class)
    public ResponseEntity<Map<String, Object>> handleMessagingException(MessagingException e) {
        logger.error("Email sending failed", e);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("message", "Failed to send email. Please try again later.");
        
        return ResponseEntity.status(500).body(response);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGenericException(Exception e) {
        logger.error("Unexpected error occurred", e);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("message", "An unexpected error occurred. Please try again later.");
        
        return ResponseEntity.status(500).body(response);
    }
}
