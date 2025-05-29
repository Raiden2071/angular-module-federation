import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.error = '';
    
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    this.authService.register(this.email, this.password).subscribe(
      success => {
        if (success) {
          this.router.navigate(['/login']);
        } else {
          this.error = 'Registration failed';
        }
      }
    );
  }
}
