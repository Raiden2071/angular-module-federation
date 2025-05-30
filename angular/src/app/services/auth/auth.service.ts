import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtToken } from '../../helpers/token';

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSignal = signal(false);
  
  private readonly mockJWTToken = 'mock-token-value';

  constructor(private router: Router) {
    const token = localStorage.getItem(jwtToken);
    if (token) {
      this.isAuthenticatedSignal.set(true);
    }
  }

  login(email: string, password: string): Observable<boolean> {
    if (email && password) {
      localStorage.setItem(jwtToken, this.mockJWTToken);
      this.isAuthenticatedSignal.set(true);

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
    localStorage.removeItem(jwtToken);
    this.isAuthenticatedSignal.set(false);
    this.router.navigate(['/login']);
  }
  
  isAuthenticated(): boolean {
    return this.isAuthenticatedSignal();
  }
}
