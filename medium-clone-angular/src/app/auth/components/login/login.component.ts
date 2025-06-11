import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  BackendErrorMessagesComponent
} from '../../../shared/components/backend-error-messages/backend-error-messages.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectIsSubmitting, selectValidationErrors } from '../../store/reducers';
import { RouterLink } from '@angular/router';
import { authActions } from '../../store/actions';
import { LoginRequestInterface } from '../../types/loginRequest.interface';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';

@Component({
  selector: 'mc-login',
  imports: [BackendErrorMessagesComponent, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  isSubmitting = this.store.selectSignal(selectIsSubmitting);
  backendErrors = this.store.selectSignal(selectValidationErrors);

  protected form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  protected onSubmit(): void {
    const request: LoginRequestInterface = {
      user: this.form.getRawValue(),
    }
    this.store.dispatch(authActions.login({ request }));
  }
}
