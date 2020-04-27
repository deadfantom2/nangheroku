import { Injectable } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from "@angular/forms";
import {
  forbiddenNameValidatorEmail,
  forbiddenNameValidatorPassword,
  PasswordValdiator,
} from "../../_helpers/user-validation";

@Injectable()
export class UserValidationService {
  public authForm: FormGroup;
  public createUserForm: FormGroup;
  public forgotPasswordForm: FormGroup;
  public resetPasswordForm: FormGroup;
  public imageForm: FormGroup;
  public dynamicForm: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.formAuth();
    this.formCreateUser();
    this.forgotPassword();
    this.resetPassword();
    this.imageUser();
  }

  private formAuth(): FormGroup {
    return (this.authForm = this._fb.group(
      {
        email: [
          null,
          [
            Validators.required,
            Validators.minLength(11),
            Validators.maxLength(50),
            forbiddenNameValidatorEmail,
          ],
        ],
        password: [
          null,
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(100),
            forbiddenNameValidatorPassword(/password/),
          ],
        ],
        confirmPassword: [null],
        // recaptcha: ["", [Validators.required]]
      },
      { validator: PasswordValdiator }
    ));
  }

  private formCreateUser(): FormGroup {
    return (this.createUserForm = this._fb.group({
      email: [
        null,
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(50),
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{1,4}$"),
        ],
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(100),
          forbiddenNameValidatorPassword(/password/),
        ],
      ],
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      surname: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      age: [
        null,
        [
          Validators.required,
          Validators.min(16),
          Validators.max(99),
          Validators.pattern("^[0-9]{2}$"),
        ],
      ],
    }));
  }

  private forgotPassword(): FormGroup {
    return (this.forgotPasswordForm = this._fb.group({
      email: [
        null,
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(50),
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{1,4}$"),
        ],
      ],
    }));
  }

  private resetPassword(): FormGroup {
    return (this.resetPasswordForm = this._fb.group({
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(100),
        ],
      ],
    }));
  }

  private imageUser(): FormGroup {
    return (this.imageForm = this._fb.group({
      file: [null, [Validators.required]],
      types: [null, [Validators.required]],
    }));
  }

  /** GET KEY FROM USER VALUE */
  get getEmail(): AbstractControl {
    // console.log(this.dynamicForm);
    // console.log(this.dynamicForm.get("email"));
    return this.dynamicForm.get("email");
  }
  get getPassword(): AbstractControl {
    return this.dynamicForm.get("password");
  }
  get getName(): AbstractControl {
    // console.log(this.dynamicForm.g et("name"));
    return this.dynamicForm.get("name");
  }
  get getSurname(): AbstractControl {
    return this.dynamicForm.get("surname");
  }
  get getAge(): AbstractControl {
    return this.dynamicForm.get("age");
  }
  // get getReCaptcha(): AbstractControl {
  //   return this.dynamicForm.get("recaptcha");
  // }

  /** GET FORM IMAGE USER */
  get getFile(): AbstractControl {
    return this.imageForm.get("file");
  }
  get getTypes(): AbstractControl {
    return this.imageForm.get("types");
  }
}
