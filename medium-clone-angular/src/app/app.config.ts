import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authFeatureKey, authReducer } from './auth/store/reducers';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import * as authEffects from './auth/store/effects';
import { authInterceptor } from './shared/services/auth-interceptor';
import { provideRouterStore } from '@ngrx/router-store';
import { feedFeatureKey, feedReducer } from './shared/components/feed/store/reducers';
import * as feedEffect from './shared/components/feed/store/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes),
    provideStore(),
    provideState(authFeatureKey, authReducer),
    provideState(feedFeatureKey, feedReducer),
    provideEffects(authEffects, feedEffect),
    provideStoreDevtools({
        maxAge: 25,
        logOnly: !isDevMode(),
        autoPause: true,
        trace: false, traceLimit: 75, connectInZone: true
    }),
    provideEffects(),
    provideRouterStore()
],
};
