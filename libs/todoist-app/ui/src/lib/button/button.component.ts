import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      class="px-4 py-2 rounded focus:outline-none"
      [class]="buttonClass"
      [disabled]="disabled"
      (click)="clicked.emit($event)">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<MouseEvent>();

  get buttonClass(): string {
    const baseClasses = 'transition-colors duration-200';
    
    switch (this.variant) {
      case 'primary':
        return `${baseClasses} bg-blue-500 hover:bg-blue-600 text-white disabled:bg-blue-300`;
      case 'secondary':
        return `${baseClasses} bg-gray-200 hover:bg-gray-300 text-gray-800 disabled:bg-gray-100`;
      case 'danger':
        return `${baseClasses} bg-red-500 hover:bg-red-600 text-white disabled:bg-red-300`;
      default:
        return `${baseClasses} bg-blue-500 hover:bg-blue-600 text-white`;
    }
  }
} 