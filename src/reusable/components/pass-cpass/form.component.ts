import { Component, input, InputSignal } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { InputDirective } from "../../../directives/input.directive";

@Component({
  selector: "cr-pass-cpass-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
  imports: [ReactiveFormsModule, InputDirective]
})
export class FormComponent {
  title = "Form";
  form = input() as InputSignal<FormGroup>;
}