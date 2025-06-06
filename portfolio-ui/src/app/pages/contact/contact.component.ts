import { ContactServiceService, ContactFormData, ContactResponse } from './../../service/contact-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ContactInfo {
  icon: string;
  title: string;
  value: string;
  link?: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;
  submitMessage = '';

  contactInfo: ContactInfo[] = [
    {
      icon: '✉',
      title: 'Email',
      value: 'chandruravik3@gmail.com',
      link: 'mailto:chandruravik3@gmail.com'
    },
    {
      icon: '📞',
      title: 'Phone',
      value: '+91 9345306557',
      link: 'tel:+919345306557'
    },
    {
      icon: '📍',
      title: 'Location',
      value: 'Seevaram 3rd st, Seevaram, Perungudi, Chennai'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: 'linkedin.com/in/chandru3c3/',
      link: 'https://linkedin.com/in/chandru-r-54b474241'
    },
    {
      icon: '🔗',
      title: 'GitHub',
      value: 'github.com/chandru3c3/',
      link: 'https://github.com/Chandru3C3/portfolio-web'
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactServiceService // Fixed: Uncommented and injected the service
  ) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.animateContactItems();
  }

  private animateContactItems(): void {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    setTimeout(() => {
      const items = document.querySelectorAll('.contact-item, .contact-form');
      items.forEach(item => observer.observe(item));
    }, 100);
  }

  onSubmit(): void {
  if (this.contactForm.valid && !this.isSubmitting) {
    this.isSubmitting = true;
    this.submitMessage = '';
    
    // Get form values
    const formData: ContactFormData = {
      name: this.contactForm.get('name')?.value,
      email: this.contactForm.get('email')?.value,
      subject: this.contactForm.get('subject')?.value,
      message: this.contactForm.get('message')?.value
    };

    console.log('Sending form data:', formData); // DEBUG LOG
    console.log('API URL:', 'http://localhost:8080/api/contact/send'); // DEBUG LOG

    // Call the service
    this.contactService.sendMessage(formData).subscribe({
      next: (response: ContactResponse) => {
        console.log('Success response:', response); // DEBUG LOG
        if (response.success) {
          this.submitMessage = response.message || 'Thank you for your message! I\'ll get back to you soon.';
          this.contactForm.reset();
        } else {
          this.submitMessage = 'Sorry, there was an error sending your message. Please try again.';
        }
        this.isSubmitting = false;
        
        setTimeout(() => {
          this.submitMessage = '';
        }, 5000);
      },
      error: (error) => {
        console.error('Full error object:', error); // DETAILED DEBUG LOG
        console.error('Error status:', error.status); // DEBUG LOG
        console.error('Error message:', error.message); // DEBUG LOG
        console.error('Error details:', error.error); // DEBUG LOG
        
        this.submitMessage = 'Sorry, there was an error sending your message. Please try again.';
        this.isSubmitting = false;
        
        setTimeout(() => {
          this.submitMessage = '';
        }, 5000);
      }
    });
  } else {
    this.markFormGroupTouched();
  }
}

  private markFormGroupTouched(): void {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.contactForm.get(fieldName);
    if (control && control.errors && control.touched) {
      if (control.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} is required`;
      }
      if (control.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (control.errors['minlength']) {
        const requiredLength = control.errors['minlength'].requiredLength;
        return `${this.getFieldDisplayName(fieldName)} must be at least ${requiredLength} characters`;
      }
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message'
    };
    return displayNames[fieldName] || fieldName;
  }

  hasError(fieldName: string): boolean {
    const control = this.contactForm.get(fieldName);
    return !!(control && control.errors && control.touched);
  }
}