import { Component } from '@angular/core';
import { routeAnimation } from '../../app/animation';

@Component({
    selector: 'cr-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss'],
    host: { '[@routeAnimation]': '' },
    animations: [routeAnimation]
})
export class BoughtCourseComponent {}