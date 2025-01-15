import { AbstractControl } from "@angular/forms";

export class FormValidator {
    /**
     * Validator for the email field. This validator checks that the email matches the regular expression given above.
     * The regular expression checks that the email has at least 2 characters, and that it contains at least one letter, one number and one special character.
     * @param control AbstractControl
     * @returns null if the validation is successful, or an object with a property 'email' if the validation fails.
     */
    static email(control: AbstractControl) {
        const EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return EMAIL_REGEXP.test(control.value) ? null : { email: true };
    }

    /**
     * Validator for the password field. This validator checks that the password matches the regular expression given above.
     * The regular expression checks that the password has at least 6 characters, and that it contains at least one uppercase letter, one lowercase letter, one number and one special character.
     * @param control AbstractControl
     * @returns null if the validation is successful, or an object with a property 'password' if the password does not match the regular expression.
     */
    static password(control: AbstractControl) {
        const PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return PASSWORD_REGEXP.test(control.value) ? null : { password: true };
    }

    /**
     * Validator for the signup form. This validator checks that the password and confirm password input fielappService have the same value, and that the value matches the regular expression given above.
     * The regular expression checks that the password has at least 6 characters, and that it contains at least one uppercase letter, one lowercase letter, one number and one special character.
     * @param control AbstractControl
     * @returns null if the validation is successful, or an object with a property 'passwordMismatch' if the password and confirm password do not match, or an object with a property 'incorrectFormat' if the password does not match the regular expression.
     */
    static parentValidate(control: AbstractControl) {
        const PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        let password = control.get('password')?.value;
        let confirmPassword = control.get('confirmPassword')?.value;

        if (password === confirmPassword) {
            if (PASSWORD_REGEXP.test(password)) return null;
            else return { incorrectFormat: true };
        }
        else return { passwordMismatch: true }
    }
}