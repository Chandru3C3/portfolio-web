// Updated ContactService with server detection and fallback
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  errors?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {
  private apiUrl = 'http://localhost:8080/api/contact';
  private serverAvailable = false;

  constructor(private http: HttpClient) {
    this.checkServerAvailability();
  }

  // Check if server is running
  private checkServerAvailability(): void {
    this.http.get(`${this.apiUrl}/health`).pipe(
      timeout(5000)
    ).subscribe({
      next: () => {
        this.serverAvailable = true;
        console.log('✅ Backend server is available');
      },
      error: () => {
        this.serverAvailable = false;
        console.log('❌ Backend server is not available');
      }
    });
  }

  sendMessage(contactForm: ContactFormData): Observable<ContactResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    console.log('🚀 Sending message to:', `${this.apiUrl}/send`);
    console.log('📤 Form data:', contactForm);

    return this.http.post<ContactResponse>(`${this.apiUrl}/send`, contactForm, { headers }).pipe(
      timeout(50000), // 10 second timeout
      catchError((error: HttpErrorResponse) => {
        console.error('❌ HTTP Error:', error);
        
        let userMessage = 'Sorry, there was an error sending your message.';
        
        if (error.status === 0) {
          userMessage = '🔌 Unable to connect to server. Please ensure the backend server is running on http://localhost:8080';
          console.error('💡 To fix this:');
          console.error('1. Start your Spring Boot application');
          console.error('2. Make sure it\'s running on port 8080');
          console.error('3. Check CORS configuration');
        } else if (error.status === 404) {
          userMessage = '🔍 Server endpoint not found. Check if /api/contact/send exists.';
        } else if (error.status === 500) {
          userMessage = '⚠️ Server error occurred. Check server logs.';
        } else if (error.status === 400) {
          userMessage = '📝 Form validation failed. Please check your input.';
        }
        
        return of({
          success: false,
          message: userMessage,
          errors: error.error
        });
      })
    );
  }

  // Test server connectivity
  testConnection(): Observable<any> {
    return this.http.get(`${this.apiUrl}/test`).pipe(
      catchError(error => {
        console.error('Server test failed:', error);
        return of({ error: 'Server not reachable' });
      })
    );
  }

  // Mock service for testing without backend
  sendMessageMock(contactForm: ContactFormData): Observable<ContactResponse> {
    console.log('🧪 Mock sending message:', contactForm);
    
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          success: true,
          message: '✅ Mock: Thank you for your message! I\'ll get back to you soon.'
        });
        observer.complete();
      }, 2000);
    });
  }
}