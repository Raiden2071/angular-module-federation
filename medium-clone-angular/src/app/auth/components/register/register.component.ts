import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { register } from '../../store/actions';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  imports: [ReactiveFormsModule],
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    const request = {
      user: this.form.getRawValue(),
    }
    this.store.dispatch(register({ request }));
  }
}
