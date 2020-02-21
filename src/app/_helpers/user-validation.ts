import { AbstractControl, ValidatorFn } from '@angular/forms';

export function forbiddenNameValidatorEmail(control: AbstractControl): { [key: string]: any | null } {
    const forbidden = /admin/.test(control.value);
    return forbidden ? { 'forbiddenNameInput': { value: control.value } } : null;
}

export function forbiddenNameValidatorPassword(forbiddenName: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const forbidden = forbiddenName.test(control.value);
        return forbidden ? { 'forbiddenNameInput': { value: control.value } } : null;
    }
};

export function PasswordValdiator(control: AbstractControl): { [key: string]: any | null } {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password.pristine || confirmPassword.pristine) {
        return null;
    }
    return password && confirmPassword && password.value !== confirmPassword.value ? { 'misMatch': true } : null;
}
