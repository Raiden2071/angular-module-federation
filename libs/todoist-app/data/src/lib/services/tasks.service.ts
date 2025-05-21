import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../models/task.model';
import { addTask, toggleTaskCompletion, deleteTask } from '../state/tasks/tasks.actions';
import { selectAllTasks, selectTaskCount } from '../state/tasks/tasks.selectors';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private readonly store: Store;
  readonly tasks$;
  readonly taskCount$;

  constructor(store: Store) {
    this.store = store;
    this.tasks$ = this.store.select(selectAllTasks);
    this.taskCount$ = this.store.select(selectTaskCount);
  }

  addTask(title: string): void {
    const task: Task = {
      id: uuidv4(),
      title,
      completed: false
    };
    this.store.dispatch(addTask({ task }));
  }

  toggleTaskCompletion(id: string): void {
    this.store.dispatch(toggleTaskCompletion({ id }));
  }

  deleteTask(id: string): void {
    this.store.dispatch(deleteTask({ id }));
  }
} 