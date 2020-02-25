import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import {
    forbiddenNameValidatorEmail, forbiddenNameValidatorPassword,
    PasswordValdiator
} from "../../_helpers/user-validation";

@Injectable()
export class UserValidationService {

    public authForm: FormGroup;

    constructor(private _fb: FormBuilder) {
        this.formAuth()
    }

    private formAuth(): FormGroup {
        return this.authForm = this._fb.group({
            email: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(50), forbiddenNameValidatorEmail]],
            password: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(100), forbiddenNameValidatorPassword(/password/)]],
            confirmPassword: [null],
        }, { validator: PasswordValdiator });
    }

    /** GET KEY FROM REGISTERFORM VALUE */
    get getEmail(): AbstractControl {
        return this.authForm.get('email');
    }
    get getPassword(): AbstractControl {
        return this.authForm.get('password');
    }


}
