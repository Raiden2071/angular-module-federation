import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'lib-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    @if (isOpen) {
      <div class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Backdrop -->
        <div 
          class="fixed inset-0 bg-black/50 transition-opacity" 
          (click)="closeModal()"
          (keydown.escape)="closeModal()"
          tabindex="0"
          role="button"
          aria-label="Close modal">
        </div>
        
        <!-- Modal Content -->
        <div class="bg-white rounded-lg shadow-lg w-full max-w-lg z-10 p-6 relative">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-semibold">{{ title }}</h3>
            <button 
              class="text-gray-500 hover:text-gray-700 p-1" 
              (click)="closeModal()"
              aria-label="Close">
              ✕
            </button>
          </div>
          
          <div class="mb-4">
            <ng-content></ng-content>
          </div>
          
          <div class="flex justify-end gap-3">
            <lib-button variant="secondary" (clicked)="closeModal()">
              Cancel
            </lib-button>
            <lib-button variant="primary" (clicked)="confirmed.emit()">
              {{ confirmText }}
            </lib-button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = 'Modal';
  @Input() confirmText = 'Save';
  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<void>();
  
  closeModal(): void {
    this.closed.emit();
  }
} 