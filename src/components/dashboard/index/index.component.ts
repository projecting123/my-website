import { Component, inject, OnDestroy, signal } from '@angular/core';
import { matEmailOutline } from '@ng-icons/material-icons/outline';
import { provideIcons } from '@ng-icons/core';
import { routeAnimation } from '../../../app/animation';
import { AuthUserInfo } from '../../../app/interfaces';
import { CRLinkDirective } from '../../../directives/crlink.directive';
import { TransferStateService } from '../../../services/transferstate.service';
@Component({
  selector: 'cr-index-dash',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  imports: [CRLinkDirective],
  host: { '[@routeAnimation]': '' },
  animations: [routeAnimation],
  viewProviders: [provideIcons({ matEmailOutline })],
})
export class IndexPage implements OnDestroy{
  readonly user = signal<null | AuthUserInfo>(null);
  private readonly ts = inject(TransferStateService);
  constructor(){
    this.user.set(this.ts.get(this.ts.AUTH_USER_KEY));
  }

  ngOnDestroy(): void {
  }
}
