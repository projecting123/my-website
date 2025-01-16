import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { firstValueFrom, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CR_APP_CONFIG } from '../../../tokens/app.token';
import { matEmailOutline } from '@ng-icons/material-icons/outline';
import { provideIcons } from '@ng-icons/core';
import { routeAnimation } from '../../../app/animation';
import { UserService } from '../../../services/user.service';
import { AuthUserInfo } from '../../../app/interfaces';
import { CRLinkDirective } from '../../../directives/crlink.directive';
@Component({
  selector: 'cr-index-dash',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  imports: [CRLinkDirective],
  host: { '[@routeAnimation]': '' },
  animations: [routeAnimation],
  viewProviders: [provideIcons({ matEmailOutline })],
})
export class IndexPage implements OnInit, OnDestroy {
  readonly user = signal<null | AuthUserInfo>(null);
  private readonly route = inject(ActivatedRoute);
  private readonly app = inject(CR_APP_CONFIG);
  private readonly userService = inject(UserService);
  private readonly subscription: Subscription = new Subscription();

  async ngOnInit() {
    const res = await firstValueFrom(this.route.data);
    if (this.app.isServer) {
      this.user.set(res['auth']);
    } else {
      const userSubscription = this.userService.userSubject.subscribe((user) =>
        this.user.set(user)
      );
      this.subscription.add(userSubscription);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
