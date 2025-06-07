import { ChangeDetectionStrategy, Component, input, OnInit, signal, WritableSignal } from '@angular/core';
import { BackendErrorsInterface } from '../../types/backendErrors.interface';

@Component({
  selector: 'mc-backend-error-messages',
  imports: [],
  templateUrl: './backend-error-messages.component.html',
  styleUrl: './backend-error-messages.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackendErrorMessagesComponent implements OnInit {
  backendErrors = input.required<BackendErrorsInterface>();

  errorMessages: WritableSignal<string[]> = signal([]);

  public ngOnInit() {
    this.errorMessages.set(Object.keys(this.backendErrors()).map((name: string) => {
      const messages = this.backendErrors()[name].join(' ');
      return `${name} ${messages}`;
    }));
  }
}
