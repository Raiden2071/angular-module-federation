import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { tasksReducer, TASKS_FEATURE_KEY } from './tasks/tasks.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(TASKS_FEATURE_KEY, tasksReducer),
    EffectsModule.forFeature([]),
  ],
})
export class StateModule {} 