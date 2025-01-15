import { Component } from '@angular/core';
import { routeAnimation } from '../../../app/animation';

@Component({
  selector: 'cr-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  host: { '[@routeAnimation]': '' },
  animations: [routeAnimation],
})
export class NotificationPage {}
