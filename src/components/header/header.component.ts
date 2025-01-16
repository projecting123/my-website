import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { CRLinkDirective } from '../../directives/crlink.directive';
import { SettingsService } from '../../services/settings.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matMenuOutline } from '@ng-icons/material-icons/outline';

@Component({
  selector: 'cr-header',
  imports: [RouterLink, RouterLinkActive, CRLinkDirective, NgIcon],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  viewProviders: [provideIcons({ matMenuOutline })],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  readonly isAuthorized = signal<boolean>(false);
  private readonly settings = inject(SettingsService);
  private readonly isSidebarExpanded = signal<boolean>(false);
  ngOnInit(): void {
    const authSubscription = this.auth.isAuthorized.subscribe((value: any) =>
      this.isAuthorized.set(value)
    );
    this.subscription.add(authSubscription);
  }

  logout() {
    const response = this.auth.logout();
    const logoutSubscription = response.subscribe({
      next: () => {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      },
    });
    this.subscription.add(logoutSubscription);
  }

  toggleSidebar() {
    this.isSidebarExpanded.set(!this.isSidebarExpanded());
    this.settings.isExpandedSidebar$.next(this.isSidebarExpanded());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
