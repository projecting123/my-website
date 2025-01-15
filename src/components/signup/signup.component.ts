import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormService } from '../../services/form.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormComponent } from '../../reusable/components/email-pass/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputDirective } from '../../directives/input.directive';
import { FormButtonDirective } from '../../directives/formbutton.directive';

@Component({
  selector: 'cr-signup',
  imports: [
    FormComponent,
    ReactiveFormsModule,
    FormButtonDirective,
    InputDirective,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  private readonly subscription: Subscription = new Subscription();
  readonly fs = inject(FormService);
  private readonly route = inject(ActivatedRoute);

  ngOnInit() {
    const pathSubscription = this.route.url.subscribe((url) => {
      this.fs.formType.set(url[0].path);
      this.fs.currentFormFields().reset();
    });
    this.subscription.add(pathSubscription);
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
