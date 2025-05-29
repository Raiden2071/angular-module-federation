import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  protected username = signal('User');

  private readonly httpClient = inject(HttpClient);
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    this.username.set('Viacheslav');
    this.httpClient.get('https://jsonplaceholder.typicode.com/todos/1').subscribe((value) => {
      this.username.set('Slava');
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
