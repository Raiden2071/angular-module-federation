import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponseInterface } from '../types/authResponse.interface';
import { LoginRequestInterface } from '../types/loginRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 private http = inject(HttpClient);

 register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
   const url = `${environment.apiUrl}/users`;

   return this.http.post<AuthResponseInterface>(url, data)
     .pipe(map(response => response.user));
 }

 login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
   const url = `${environment.apiUrl}/users/login`;

   return this.http.post<AuthResponseInterface>(url, data)
    .pipe(map(response => response.user));
 }
}
