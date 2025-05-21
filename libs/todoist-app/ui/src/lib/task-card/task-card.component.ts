import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'lib-task-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="bg-white rounded-lg shadow p-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <input 
          type="checkbox" 
          class="h-5 w-5 accent-blue-500 cursor-pointer" 
          [checked]="completed"
          (change)="statusChanged.emit()" />
        <span [class.line-through]="completed" [class.text-gray-500]="completed">{{ title }}</span>
      </div>
      <lib-button variant="danger" (clicked)="deleted.emit()">Delete</lib-button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      margin-bottom: 0.5rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCardComponent {
  @Input({ required: true }) title = '';
  @Input() completed = false;
  @Output() statusChanged = new EventEmitter<void>();
  @Output() deleted = new EventEmitter<void>();
} 