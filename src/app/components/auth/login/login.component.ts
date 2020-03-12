import { Component, OnInit } from "@angular/core";
import {
  AuthService,
  UserValidationService
} from "../../../_services";
import { FormGroup, AbstractControl } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public getEmail: AbstractControl;
  public getPassword: AbstractControl;

  constructor(
    private _authService: AuthService,
    private _userValidationService: UserValidationService,
  ) {}

  ngOnInit() {
    this.loginForm = this._userValidationService.authForm;
    this.getEmail = this._userValidationService.getEmail;
    this.getPassword = this._userValidationService.getPassword;
    /** RESET AUTH FORM */
    this.loginForm.setValue({
      email: "cameratest811@gmail.com",
      password: "frfr",
      confirmPassword: null
    });
  }

  public doLoginUser(): void {
    this._authService.login(this.loginForm.value);
  }
}
