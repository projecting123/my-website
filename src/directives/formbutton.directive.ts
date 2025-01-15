import {
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormService } from '../services/form.service';
import { ButtonService } from '../services/button.service';
import { fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: '[formButton]',
})
export class FormButtonDirective implements OnInit, OnDestroy {
  private readonly fs = inject(FormService);
  private readonly bs = inject(ButtonService);
  private readonly buttonEl = inject(ElementRef).nativeElement as HTMLButtonElement;
  private readonly subscription: Subscription = new Subscription();

  ngOnInit() {
    this.bs.setButtonDisability(
      this.buttonEl,
      this.fs.currentFormFields().invalid
    );

    const subscription = this.fs.isSubmittingForm.subscribe((isSubmitting) => {
      this.bs.setButtonDisability(this.buttonEl, isSubmitting);
    });

    const statusSubscription = this.fs
      .currentFormFields()
      .statusChanges.subscribe((status) => {
        if (status === 'VALID')
          this.bs.setButtonDisability(this.buttonEl, false);
        else this.bs.setButtonDisability(this.buttonEl, true);
      });

    const formSubmit = fromEvent(this.buttonEl, 'click');
    const formSubmitSubscription = formSubmit.subscribe((event: any) => {
      if (this.fs.formType() === 'signup')
        this.fs.signup().subscribe(this.fs.signupObserver);
      else if (this.fs.formType() === 'login')
        this.fs.login().subscribe(this.fs.loginObserver);
    });

    this.subscription.add(subscription);
    this.subscription.add(statusSubscription);
    this.subscription.add(formSubmitSubscription);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
