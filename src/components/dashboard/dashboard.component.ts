import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../reusable/components/sidebar/sidebar.component';
import { CR_APP_CONFIG } from '../../tokens/app.token';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'cr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [SidebarComponent, RouterOutlet],
})
export class DashboardComponent implements OnInit{
  private readonly route = inject(ActivatedRoute);
  private readonly app = inject(CR_APP_CONFIG);
  private readonly userService = inject(UserService);
  async ngOnInit() {
    const res = await firstValueFrom(this.route.data);
    if (this.app.isBrowser) {
      const isExistUser = localStorage.getItem('user');
      if (!isExistUser){
        localStorage.setItem('user', JSON.stringify(res['auth']));
        this.userService.set(res['auth']);
      }
      else{
        this.userService.set(JSON.parse(isExistUser));
      }
    }
  }
}
