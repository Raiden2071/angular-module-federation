import { ChangeDetectionStrategy, Component, HostBinding, HostListener, inject, OnInit } from '@angular/core';
import { InactivityService } from '../../services/inactivity/inactivity.service';
import { RouterOutlet } from '@angular/router';

export const OneMinute = 60 * 1000;
export const TimeWhenWillBeLoggedOut = 0.05 * OneMinute;

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [InactivityService]
})
export class LayoutComponent implements OnInit {
  private readonly inactivityService = inject(InactivityService);


  @HostBinding('style.backgroundColor') color = 'red';

  @HostListener('dblclick', ['$event'])
  onMouseClick(event: MouseEvent) {
    console.log('double click');
  }

  ngOnInit(): void {
    this.inactivityService.initListenerInactivity();
  }
}
