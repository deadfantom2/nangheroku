import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    forbiddenNameValidatorEmail, forbiddenNameValidatorPassword,
    PasswordValdiator
} from "../../_helpers/user-validation";

@Injectable()
export class UserValidationService {

    public registerForm: FormGroup;

    constructor(private _fb: FormBuilder) {
        this.formRegister()
    }

    private formRegister() {
        this.registerForm = this._fb.group({
            email: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(50), forbiddenNameValidatorEmail]],
            password: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(100), forbiddenNameValidatorPassword(/password/)]],
            confirmPassword: [null],
        }, { validator: PasswordValdiator });
    }

    /** GET KEY FROM REGISTERFORM VALUE */
    get getEmail() {
        return this.registerForm.get('email');
    }
    get getPassword() {
        return this.registerForm.get('password');
    }


}
