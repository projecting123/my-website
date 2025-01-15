import { computed, inject, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidator } from '../validators/form.validator';
import { BehaviorSubject, Observer, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  formType = signal<string | null>(null);
  readonly isSubmittingForm = new Subject<boolean>();
  private readonly settings = inject(SettingsService);
  public readonly formSubmitted = new Subject();
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  public readonly currentFormFields = computed<FormGroup<any>>(() => {
    if (this.formType() == 'signup') return this.signupFormFields;
    if (this.formType() == 'login') return this.loginFormFields;
    return new FormGroup(null);
  });

  private readonly signupFormFields = new FormGroup(
    {
      name: new FormControl(''),
      email: new FormControl('', [FormValidator.email]),
      password: new FormControl('', [FormValidator.password]),
      confirmPassword: new FormControl(''),
    },
    [FormValidator.parentValidate]
  );

  private readonly loginFormFields = new FormGroup({
    email: new FormControl('', [FormValidator.email]),
    password: new FormControl('', [FormValidator.password]),
  });

  signup() {
    this.isSubmittingForm.next(true);
    delete this.currentFormFields().value.confirmPassword;
    return this.http.post(
      'http://localhost:4500/api/signup',
      this.currentFormFields().value
    );
  }

  login() {
    this.isSubmittingForm.next(true);
    return this.http.post(
      'http://localhost:4500/api/login',
      this.currentFormFields().value,
      { withCredentials: true }
    );
  }

  /**
   * Resets the form after a submission (successful or not). This
   * method is used to prevent the user from submitting the form
   * multiple times.
   */
  modifyFormAfterSubmission(): void {
    this.isSubmittingForm.next(false);
    this.currentFormFields().reset();
    this.formSubmitted.next(true);
  }

  readonly signupObserver: Partial<Observer<Object>> = {
    next: (res: any) => {
      this.modifyFormAfterSubmission();
      this.settings.openSnackbar('Account created successfully!', {
        bgColor: 'SUCCESS',
      });
    },

    error: () => {
      this.modifyFormAfterSubmission();
      this.settings.openSnackbar('Something went wrong!', {
        bgColor: 'ERROR',
      });
    },
  };

  readonly loginObserver: Partial<Observer<Object>> = {
    next: (res: any) => {
      this.modifyFormAfterSubmission();
      this.router.navigate(['/dashboard']);
    },
    error: () => {
      this.settings.openSnackbar('Something went wrong!', {
        bgColor: 'ERROR',
      });
      this.modifyFormAfterSubmission();
    },
  };
}
