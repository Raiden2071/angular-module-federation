import { CommonModule } from '@angular/common'
import { Component, inject, input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { combineLatest, of } from 'rxjs'

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class FeedComponent implements OnInit {
  readonly apiUrl = input<string>('');
  private store = inject(Store);

  data$ = combineLatest({
    isLoading: of(true),
    error: of(null),
    feed: of({ }),
  })

  ngOnInit(): void {
    // this.store.dispatch(feedActions.getFeed({url: this.apiUrl}))
  }
}
