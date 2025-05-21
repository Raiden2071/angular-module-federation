import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasksService } from '@todoist/data';
import { ButtonComponent, TaskCardComponent, ModalComponent } from '@todoist/ui';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, AsyncPipe, FormsModule, ButtonComponent, TaskCardComponent, ModalComponent],
  template: `
    <div class="p-6 ml-64 min-h-screen bg-gray-100">
      <!-- Mobile header -->
      <div class="md:hidden mb-6 flex items-center">
        <button class="text-gray-800 p-2 mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        <h1 class="text-2xl font-bold">Todoist</h1>
      </div>
      
      <!-- Header -->
      <div class="mb-8 flex justify-between items-center">
        <h2 class="text-2xl font-bold text-gray-800">My Tasks</h2>
        <lib-button (clicked)="isModalOpen.set(true)">Add Task</lib-button>
      </div>
      
      <!-- Task List -->
      <div class="space-y-4">
        <ng-container *ngIf="tasks$ | async as tasks">
          <ng-container *ngIf="tasks.length > 0; else empty">
            <lib-task-card 
              *ngFor="let task of tasks; trackBy: trackById"
              [title]="task.title"
              [completed]="task.completed"
              (statusChanged)="toggleTask(task.id)"
              (deleted)="deleteTask(task.id)"
            ></lib-task-card>
          </ng-container>
        </ng-container>
        
        <ng-template #empty>
          <div class="bg-white p-8 text-center rounded-lg shadow">
            <p class="text-gray-500">You don't have any tasks. Create one!</p>
          </div>
        </ng-template>
      </div>
      
      <!-- Add Task Modal -->
      <lib-modal
        [isOpen]="isModalOpen()"
        title="Add New Task"
        confirmText="Add Task"
        (closed)="isModalOpen.set(false)"
        (confirmed)="addTask()"
      >
        <div class="mb-4">
          <label for="task-title" class="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
          <input
            id="task-title"
            type="text"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task title..."
            [(ngModel)]="newTaskTitle"
            (keyup.enter)="addTask()"
          />
        </div>
      </lib-modal>
    </div>
  `,
  styles: [
    `
      @media (max-width: 768px) {
        :host {
          margin-left: 0;
        }
        div.ml-64 {
          margin-left: 0;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {
  private tasksService = inject(TasksService);
  
  tasks$ = this.tasksService.tasks$;
  isModalOpen = signal(false);
  newTaskTitle = '';
  
  trackById(index: number, item: any): string {
    return item.id;
  }
  
  addTask(): void {
    if (this.newTaskTitle.trim()) {
      this.tasksService.addTask(this.newTaskTitle);
      this.newTaskTitle = '';
      this.isModalOpen.set(false);
    }
  }
  
  toggleTask(id: string): void {
    this.tasksService.toggleTaskCompletion(id);
  }
  
  deleteTask(id: string): void {
    this.tasksService.deleteTask(id);
  }
} 