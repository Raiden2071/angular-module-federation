import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router) {
    // Check for token on initialization
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(email: string, password: string): Observable<boolean> {
    // Here should be real authentication logic via API
    // For example, we use mock authentication
    if (email && password) {
      localStorage.setItem('token', 'mock-token');
      this.isAuthenticatedSubject.next(true);
      return new Observable(observer => {
        observer.next(true);
        observer.complete();
      });
    }
    return new Observable(observer => {
      observer.next(false);
      observer.complete();
    });
  }

  register(email: string, password: string): Observable<boolean> {
    // Here should be real registration logic via API
    // For example, we use mock registration
    if (email && password) {
      return new Observable(observer => {
        observer.next(true);
        observer.complete();
      });
    }
    return new Observable(observer => {
      observer.next(false);
      observer.complete();
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
