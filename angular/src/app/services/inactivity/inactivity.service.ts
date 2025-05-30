import { computed, inject, NgZone, Injectable, signal, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../auth/auth.service';
import { TimeWhenWillBeLoggedOut } from '../../components/layout/layout.component';
import { debounceTime } from 'rxjs/operators';
import { concat, fromEvent } from 'rxjs';

@Injectable()
export class InactivityService {
  private readonly authService = inject(AuthService);
  private readonly ngZone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  private interval: ReturnType<typeof setInterval> | null = null;
  private lastUserActionTime = signal(new Date());
  private logoutTime = computed(() => new Date(this.lastUserActionTime().getTime() + TimeWhenWillBeLoggedOut));

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.clearInterval();
    });
  }

  public initListenerInactivity(): void {
    this.ngZone.runOutsideAngular(() => {

      this.startLogoutTimer();
      this.listenersForActivityChecking();
    });
  }

  private startLogoutTimer(): void {
    this.interval = setInterval(() => {
      if (new Date() > this.logoutTime() ) {
        this.authService.logout();
      }
    }, 1500);
  }

  private listenersForActivityChecking(): void {
    concat(
      fromEvent(document, 'mousemove'),
      fromEvent(document, 'click'),
      fromEvent(document, 'scroll')
    ).pipe(
      debounceTime(200),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.updateLastUserActivity()
    });
  }
  
  private clearInterval(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  private updateLastUserActivity(): void {
    this.lastUserActionTime.set(new Date());
  }
}
