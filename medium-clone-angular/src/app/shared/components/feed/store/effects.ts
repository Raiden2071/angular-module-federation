import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { feedActions } from './actions';
import { FeedService } from '../services/feed.service';
import { GetFeedResponseInterface } from '../types/getFeedResponse.interface';

export const feedEffect = createEffect((
    actions$ = inject(Actions),
    feedService = inject(FeedService),
) => {

  return actions$.pipe(
      ofType(feedActions.getFeed),
      switchMap(({url}) => {
        return feedService.getFeed(url).pipe(
            map((feed: GetFeedResponseInterface) => feedActions.getFeedSuccess({feed})),
            catchError(() => of(feedActions.getFeedFailure())),
        )
      }),
  );
}, {functional: true});
