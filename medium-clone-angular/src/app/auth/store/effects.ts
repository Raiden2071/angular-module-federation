import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { authActions } from './actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistanceService } from '../../shared/services/persistance.service';
import { Router } from '@angular/router';

export const registerEffect = createEffect((
  actions$ = inject(Actions),
  authService = inject(AuthService),
  persistanceService = inject(PersistanceService),
) => {

  return actions$.pipe(
    ofType(authActions.register),
    switchMap(({request}) => {
      return authService.register(request).pipe(
        map(currentUser => {
          persistanceService.set('accessToken', currentUser.token)
          return authActions.registerSuccess({currentUser});
        }),
        catchError((errorResponse: HttpErrorResponse) => of(authActions.registerFailure({errors: errorResponse.error.errors}))),
      )
    })
  )
}, {functional: true});

export const redirectAfterRegisterSuccess = createEffect((
  actions$ = inject(Actions),
  router = inject(Router),
) => {
  return actions$.pipe(
    ofType(authActions.registerSuccess),
    tap(() => router.navigateByUrl('/')),
  )
}, {functional: true, dispatch: false});
