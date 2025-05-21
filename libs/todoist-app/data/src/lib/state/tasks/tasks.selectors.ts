import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TASKS_FEATURE_KEY, TasksState, tasksAdapter } from './tasks.reducer';

export const selectTasksState = createFeatureSelector<TasksState>(TASKS_FEATURE_KEY);

const { selectAll, selectEntities } = tasksAdapter.getSelectors();

export const selectAllTasks = createSelector(
  selectTasksState,
  selectAll
);

export const selectTaskEntities = createSelector(
  selectTasksState,
  selectEntities
);

export const selectTaskCount = createSelector(
  selectAllTasks,
  tasks => tasks.length
); 