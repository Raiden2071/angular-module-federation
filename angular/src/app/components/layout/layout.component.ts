import { ChangeDetectionStrategy, Component, computed, DestroyRef, HostBinding, HostListener, inject, NgZone, OnDestroy, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { debounceTime, fromEvent, merge } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

export const OneMinute = 60 * 1000;
export const TimeWhenWillBeLoggedOut = 0.05 * OneMinute;

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit, OnDestroy {
  private readonly destroyRef = inject(DestroyRef);
  private readonly authService = inject(AuthService);
  private readonly ngZone = inject(NgZone);

  private interval: ReturnType<typeof setInterval> | null = null;
  private lastUserActionTime = signal(new Date());
  private logoutTime = computed(() => new Date(this.lastUserActionTime().getTime() + TimeWhenWillBeLoggedOut));

  @HostBinding('style.backgroundColor') color = 'red';

  @HostListener('click', ['$event'])
  onMouseClick(event: MouseEvent) {
    console.log(event);
  }

  constructor() {
  }

  ngOnInit(): void {
    this.initListenerInactivity();
  }

  private initListenerInactivity(): void {
    this.ngZone.runOutsideAngular(() => {

      this.interval = setInterval(() => {
        console.log(`
          lastUserActionTime: ${this.lastUserActionTime().toISOString()}
          logoutTime: ${this.logoutTime().toISOString()}
          isLoggedOut: ${new Date() > this.logoutTime()}
        `);

        if (new Date() > this.logoutTime() ) {
          this.authService.logout();
        }
      }, 1500);
  
      merge(
        fromEvent(document, 'mousemove'),
        fromEvent(document, 'click'),
        fromEvent(document, 'scroll')
      ).pipe(
        debounceTime(500),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe((event) => {
        console.log(event);
        this.updateLastUserActivity()
      });
    });
  }

  private updateLastUserActivity(): void {
    this.lastUserActionTime.set(new Date());
    console.log('logoutTime', this.logoutTime());
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
