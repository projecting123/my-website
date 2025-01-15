import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputDirective } from '../../../directives/input.directive';

@Component({
  selector: 'ep-form',
  imports: [ReactiveFormsModule, InputDirective],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @Input() form!: FormGroup<any>;
}