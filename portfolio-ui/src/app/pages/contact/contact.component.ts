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
      value: 'chandru.ravi.dev@email.com',
      link: 'mailto:chandru.ravi.dev@email.com'
    },
    {
      icon: '📞',
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: '📍',
      title: 'Location',
      value: 'San Francisco, CA'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: 'linkedin.com/in/chandru-java',
      link: 'https://linkedin.com/in/chandru-java'
    },
    {
      icon: '🔗',
      title: 'GitHub',
      value: 'github.com/chandru-java',
      link: 'https://github.com/chandru-java'
    }
  ];

  constructor(private formBuilder: FormBuilder) {
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

      // Simulate form submission
      setTimeout(() => {
        this.submitMessage = 'Thank you for your message! I\'ll get back to you soon.';
        this.contactForm.reset();
        this.isSubmitting = false;
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          this.submitMessage = '';
        }, 5000);
      }, 2000);
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