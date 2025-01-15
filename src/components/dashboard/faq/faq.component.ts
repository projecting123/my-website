import { Component } from '@angular/core';
import { routeAnimation } from '../../../app/animation';

@Component({
  selector: 'cr-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  host: { '[@routeAnimation]': '' },
  animations: [routeAnimation],
})
export class FAQComponent {}
