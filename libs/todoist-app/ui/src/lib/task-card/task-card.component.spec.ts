import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TaskCardComponent } from './task-card.component';
import { ButtonComponent } from '../button/button.component';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCardComponent, ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;
    component.title = 'Test Task';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should display the task title', () => {
    const titleElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(titleElement.textContent).toContain('Test Task');
  });
  
  it('should mark the task as completed when checkbox is checked', () => {
    component.completed = true;
    fixture.detectChanges();
    
    const titleElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(titleElement.classList).toContain('line-through');
  });
  
  it('should emit statusChanged event when checkbox is clicked', () => {
    const spy = jest.spyOn(component.statusChanged, 'emit');
    const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"]')).nativeElement;
    
    checkbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    
    expect(spy).toHaveBeenCalled();
  });
  
  it('should emit deleted event when delete button is clicked', () => {
    const spy = jest.spyOn(component.deleted, 'emit');
    const button = fixture.debugElement.query(By.css('lib-button')).nativeElement;
    
    button.dispatchEvent(new Event('clicked'));
    fixture.detectChanges();
    
    expect(spy).toHaveBeenCalled();
  });
}); 