import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../auth/store/reducers';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'mc-top-bar',
  imports: [RouterLink],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarComponent {
  private store = inject(Store);

  protected currentUser = this.store.selectSignal(selectCurrentUser);
}
