import { ChangeDetectionStrategy, Component, computed, DestroyRef, HostBinding, HostListener, inject, NgZone, OnDestroy, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { debounceTime, fromEvent, merge } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

export const OneMinute = 60 * 1000;
export const TimeWhenWillBeLoggedOut = 2 * OneMinute;

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
  private lastActivity = signal(new Date());
  private endActivity = computed(() => new Date(this.lastActivity().getTime() + TimeWhenWillBeLoggedOut));

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
        console.log(this.endActivity().getMinutes(), this.lastActivity().getMinutes(), this.endActivity() < this.lastActivity());
        if (this.lastActivity() > this.endActivity()) {
          this.authService.logout();
        }
      }, 1500);
  
      merge(
        fromEvent(document, 'mousemove'),
        fromEvent(document, 'click'),
        fromEvent(document, 'scroll')
      ).pipe(
        debounceTime(2000),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe((event) => {
        console.log(event);
        this.resetTimer()
      });
    });
  }

  private resetTimer(): void {
    this.lastActivity.set(new Date());
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
