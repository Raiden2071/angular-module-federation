import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { TasksService } from '@todoist/data';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  template: `
    <aside class="bg-gray-800 text-white h-full w-64 fixed top-0 left-0 p-6 shadow-lg">
      <h1 class="text-2xl font-bold mb-8">Todoist</h1>
      
      <div class="space-y-4">
        <div class="p-3 bg-gray-700 rounded-lg">
          <p>
            Total tasks: <span class="font-semibold">{{ (taskCount$ | async) || 0 }}</span>
          </p>
        </div>
      </div>
    </aside>
  `,
  styles: [`
    @media (max-width: 768px) {
      :host {
        display: none;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  private tasksService = inject(TasksService);
  readonly taskCount$ = this.tasksService.taskCount$;
} 