import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { authActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';

export const registerEffect = createEffect((
  actions$ = inject(Actions),
  authService = inject(AuthService),
) => {
  return actions$.pipe(
    ofType(authActions.register),
    switchMap(({ request }) => {
      return authService.register(request).pipe(
        map(currentUser => authActions.registerSuccess({ currentUser })),
        catchError(() => of(authActions.registerFailure())),
      )
    })
  )
}, { functional: true });
