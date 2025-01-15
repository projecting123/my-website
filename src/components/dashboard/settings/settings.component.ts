import { Component } from '@angular/core';
import { routeAnimation } from '../../../app/animation';

@Component({
  selector: 'cr-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  host: { '[@routeAnimation]': '' },
  animations: [routeAnimation],
})
export class SettingsPage {}
