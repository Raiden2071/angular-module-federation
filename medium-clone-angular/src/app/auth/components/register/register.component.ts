import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { selectIsSubmitting, selectValidationErrors } from '../../store/reducers';
import { AuthStateInterface } from '../../types/authState.interface';
import { AuthService } from '../../services/auth.service';
import { authActions } from '../../store/actions';
import {
  BackendErrorMessagesComponent
} from '../../../shared/components/backend-error-messages/backend-error-messages.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  imports: [ReactiveFormsModule, BackendErrorMessagesComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store<{ auth: AuthStateInterface }>);
  private authService = inject(AuthService);

  isSubmitting = this.store.selectSignal(selectIsSubmitting);
  backendErrors = this.store.selectSignal(selectValidationErrors);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    }
    this.store.dispatch(authActions.register({ request }));
    this.authService.register(request).subscribe(console.log);
  }
}
