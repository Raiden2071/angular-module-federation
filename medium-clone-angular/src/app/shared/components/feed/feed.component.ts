import { CommonModule, NgOptimizedImage } from '@angular/common'
import { Component, inject, input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { combineLatest } from 'rxjs'
import { feedActions } from './store/actions';
import { selectData, selectError, selectIsLoading } from './store/reducers';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
})
export class FeedComponent implements OnInit {
  readonly apiUrl = input<string>('');
  private store = inject(Store);

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    feed: this.store.select(selectData),
  })

  ngOnInit(): void {
    this.store.dispatch(feedActions.getFeed({ url: this.apiUrl() }));
  }
}
