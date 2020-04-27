import { Component, OnInit } from "@angular/core";
import { FormGroup, AbstractControl } from "@angular/forms";
import {
  AuthUserService,
  UserValidationService,
  RoutesService,
} from "src/app/_services";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  public forgotForm: FormGroup;
  public getEmail: AbstractControl;

  constructor(
    private _authUserService: AuthUserService,
    private _userValidationService: UserValidationService,
    private _routesService: RoutesService
  ) {}

  ngOnInit() {
    this.forgotForm = this._userValidationService.forgotPasswordForm;
    this._userValidationService.dynamicForm = this.forgotForm;
    this.forgotForm.reset();
    this.getEmail = this._userValidationService.getEmail;
  }

  /** Send a new password */
  public sendForgotPassword(): void {
    this._authUserService.forgotPassword(this.forgotForm.value);
    if (this.forgotForm.valid) {
      setTimeout(() => {
        this.forgotForm.reset();
        this._routesService.navigateToRoute("/login");
      }, 500);
    }
  }
}
