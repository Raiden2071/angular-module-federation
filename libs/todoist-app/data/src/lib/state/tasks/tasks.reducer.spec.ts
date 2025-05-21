import { Task } from '../../models/task.model';
import { tasksReducer, initialTasksState } from './tasks.reducer';
import * as TasksActions from './tasks.actions';

describe('Tasks Reducer', () => {
  it('should return the initial state', () => {
    const action = { type: 'NOOP' } as any;
    const result = tasksReducer(undefined, action);
    
    expect(result).toBe(initialTasksState);
  });
  
  it('should add a task', () => {
    const task: Task = { id: '1', title: 'Test Task', completed: false };
    const action = TasksActions.addTask({ task });
    const result = tasksReducer(initialTasksState, action);
    
    expect(result.ids.length).toBe(1);
    expect(result.entities['1']).toEqual(task);
  });
  
  it('should toggle task completion', () => {
    const task: Task = { id: '1', title: 'Test Task', completed: false };
    const state = tasksReducer(initialTasksState, TasksActions.addTask({ task }));
    
    const result = tasksReducer(state, TasksActions.toggleTaskCompletion({ id: '1' }));
    expect(result.entities['1']?.completed).toBe(true);
    
    const resultToggleBack = tasksReducer(result, TasksActions.toggleTaskCompletion({ id: '1' }));
    expect(resultToggleBack.entities['1']?.completed).toBe(false);
  });
  
  it('should delete a task', () => {
    const task: Task = { id: '1', title: 'Test Task', completed: false };
    const state = tasksReducer(initialTasksState, TasksActions.addTask({ task }));
    
    const result = tasksReducer(state, TasksActions.deleteTask({ id: '1' }));
    expect(result.ids.length).toBe(0);
    expect(result.entities['1']).toBeUndefined();
  });
}); 