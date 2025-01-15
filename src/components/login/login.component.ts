import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../../services/form.service';
import { Subscription } from 'rxjs';
import { FormComponent } from '../../reusable/components/email-pass/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormButtonDirective } from '../../directives/formbutton.directive';

@Component({
  selector: 'cr-login',
  imports: [ReactiveFormsModule, FormComponent, FormButtonDirective],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
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
