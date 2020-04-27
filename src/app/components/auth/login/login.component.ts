import { Component, OnInit } from "@angular/core";
import {
  AuthUserService,
  UserValidationService,
  RoutesService,
} from "../../../_services";
import { FormGroup, AbstractControl } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public authForm: FormGroup;
  public getEmail: AbstractControl;
  public getPassword: AbstractControl;

  constructor(
    private _authUserService: AuthUserService,
    private _userValidationService: UserValidationService,
    private _routesService: RoutesService
  ) {}

  ngOnInit() {
    this.loginForm = this._userValidationService.authForm;
    this._userValidationService.dynamicForm = this.loginForm;
    this.loginForm.reset();
    this.getEmail = this._userValidationService.getEmail;
    this.getPassword = this._userValidationService.getPassword;
    /** RESET AUTH FORM */
    this.loginForm.setValue({
      email: "cameratest811@gmail.com",
      password: "frfr",
      confirmPassword: null,
      // recaptcha: ""
    });
  }

  /** Simple Auth */
  public doLoginUser(): void {
    this._authUserService.login(this.loginForm.value);
  }

  /** Navigate to root */
  public navigateToPage(path: string): void {
    this._routesService.navigateToRoute(path);
  }
}
