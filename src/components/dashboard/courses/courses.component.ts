import { Component } from '@angular/core';
import { CourseCardComponent } from '../../../reusable/components/course-card/card.component';
import { routeAnimation } from '../../../app/animation';

@Component({
    selector: 'cr-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss'],
    imports: [CourseCardComponent],
    host: { '[@routeAnimation]': '' },
    animations: [routeAnimation]
})
export class CoursesPage {
}