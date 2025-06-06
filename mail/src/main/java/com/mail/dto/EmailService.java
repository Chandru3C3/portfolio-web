package com.mail.dto;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
    
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Value("${app.contact.recipient-email}")
    private String recipientEmail;
    
    @Value("${spring.mail.username}")
    private String fromEmail;
    
    public void sendContactEmail(ContactFormDto contactForm) throws MessagingException {
        try {
            // Send HTML email
            sendHtmlEmail(contactForm);
            logger.info("Contact email sent successfully from: {}", contactForm.getEmail());
        } catch (MessagingException e) {
            logger.error("Failed to send contact email: {}", e.getMessage());
            throw e;
        }
    }
    
    private void sendHtmlEmail(ContactFormDto contactForm) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        
        helper.setFrom(contactForm.getEmail());
        helper.setTo(recipientEmail);
        helper.setReplyTo(contactForm.getEmail());
        helper.setSubject("Portfolio Contact: " + contactForm.getSubject());
        
        String htmlContent = buildHtmlEmailContent(contactForm);
        helper.setText(htmlContent, true);
        
        mailSender.send(message);
    }
    
    private String buildHtmlEmailContent(ContactFormDto contactForm) {
        return """
            <!DOCTYPE html>
            <html>
            <head></head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>New Contact Form Submission</h2>
                    </div>
                    <div class="content">
                        <div class="field">
                            <div class="label">From:</div>
                            <div class="value">%s</div>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(
                contactForm.getName()
            );
    }
    
    // Alternative simple text email method
    public void sendSimpleEmail(ContactFormDto contactForm) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(recipientEmail);
        message.setReplyTo(contactForm.getEmail());
        message.setSubject("Portfolio Contact: " + contactForm.getSubject());
        
        String text = String.format("""
            New contact form submission:
            
            From: %s
            Email: %s
            Subject: %s
            
            Message:
            %s
            """, 
            contactForm.getName(),
            contactForm.getEmail(),
            contactForm.getSubject(),
            contactForm.getMessage()
        );
        
        message.setText(text);
        mailSender.send(message);
    }
}