import { Component, Input } from '@angular/core';

@Component({
    selector: 'quiz-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
 })
export class QuizCardComponent {
    @Input() quiz: any;
}