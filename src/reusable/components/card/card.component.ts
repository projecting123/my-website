import { Component, Input } from '@angular/core';

@Component({
    selector: 'cr-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    host: {
        'class': 'cr-card'
    } 
})
export class CardComponent {
}