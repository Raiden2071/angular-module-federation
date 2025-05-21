import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TasksService } from './tasks.service';
import { addTask, toggleTaskCompletion, deleteTask } from '../state/tasks/tasks.actions';
import { selectAllTasks } from '../state/tasks/tasks.selectors';

describe('TasksService', () => {
  let service: TasksService;
  let store: MockStore;
  const initialState = { tasks: { ids: [], entities: {} } };
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TasksService,
        provideMockStore({ initialState })
      ]
    });
    
    service = TestBed.inject(TasksService);
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectAllTasks, []);
    
    jest.spyOn(store, 'dispatch');
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should dispatch addTask action', () => {
    // Mock uuid to get a predictable ID
    jest.mock('uuid', () => ({
      v4: () => '1234'
    }));
    
    service.addTask('Test Task');
    
    expect(store.dispatch).toHaveBeenCalledWith(
      addTask({
        task: expect.objectContaining({
          title: 'Test Task',
          completed: false
        })
      })
    );
  });
  
  it('should dispatch toggleTaskCompletion action', () => {
    service.toggleTaskCompletion('123');
    
    expect(store.dispatch).toHaveBeenCalledWith(
      toggleTaskCompletion({ id: '123' })
    );
  });
  
  it('should dispatch deleteTask action', () => {
    service.deleteTask('123');
    
    expect(store.dispatch).toHaveBeenCalledWith(
      deleteTask({ id: '123' })
    );
  });
}); 