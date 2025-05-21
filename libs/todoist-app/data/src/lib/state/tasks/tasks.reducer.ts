import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Task } from '../../models/task.model';
import * as TasksActions from './tasks.actions';

export const TASKS_FEATURE_KEY = 'tasks';

export interface TasksState extends EntityState<Task> {
  loaded: boolean;
}

export const tasksAdapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialTasksState: TasksState = tasksAdapter.getInitialState({
  loaded: false
});

export const tasksReducer = createReducer(
  initialTasksState,
  on(TasksActions.addTask, (state, { task }) => 
    tasksAdapter.addOne(task, state)
  ),
  on(TasksActions.toggleTaskCompletion, (state, { id }) => {
    const task = state.entities[id];
    if (!task) return state;
    return tasksAdapter.updateOne(
      { id, changes: { completed: !task.completed } },
      state
    );
  }),
  on(TasksActions.deleteTask, (state, { id }) => 
    tasksAdapter.removeOne(id, state)
  )
); 