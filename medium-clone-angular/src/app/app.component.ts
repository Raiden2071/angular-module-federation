import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from './auth/store/actions';
import { TopBarComponent } from './shared/components/top-bar/top-bar.component';

@Component({
  selector: 'mc-root',
  imports: [TopBarComponent, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private store = inject(Store);

  public ngOnInit(): void{
    this.store.dispatch(authActions.getCurrentUser());
  }
}
