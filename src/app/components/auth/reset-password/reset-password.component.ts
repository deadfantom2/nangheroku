import { Component, OnInit } from "@angular/core";
import {
  AuthUserService,
  RoutesService,
  UserValidationService,
} from "src/app/_services";
import { ActivatedRoute } from "@angular/router";
import { Observable, of, Subscription } from "rxjs";
import { ResModel } from "src/app/_models";
import { FormGroup, AbstractControl } from "@angular/forms";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
  public resetForm: FormGroup;
  public getPassword: AbstractControl;

  public resetPasswordSub: Subscription;
  public link$: Observable<ResModel>;
  public timeLeft: number = 3;
  private timer: any;

  constructor(
    private _authUserService: AuthUserService,
    private _userValidationService: UserValidationService,
    private _activeRoute: ActivatedRoute,
    private _routesService: RoutesService
  ) {}

  ngOnInit() {
    this.resetForm = this._userValidationService.resetPasswordForm;
    this._userValidationService.dynamicForm = this.resetForm;
    this.resetForm.reset();
    this.getResetPage();
    this.getPassword = this._userValidationService.getPassword;
  }

  public getResetPage(): void {
    this.link$ = this._authUserService.activationOrResetResponse;
    console.log("this.link$: ", this.link$.source);
    console.log(
      "this._authUserService.activationOrResetResponse: ",
      this._authUserService.activationOrResetResponse
    );
    console.log(this.link$);
    this._authUserService.activateOrResetAccount(
      this._activeRoute.snapshot.params.token,
      "reset"
    );
  }

  public activeRedirect(): void {
    this.timer = setInterval(() => {
      if (this.timeLeft > 1) {
        this.timeLeft--;
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
    setTimeout(() => {
      this._routesService.navigateToRoute("/login");
    }, 3000);
  }

  public doResetPassword(): void {
    console.log(this.resetForm.value);
    this._authUserService.resetPassword(
      this._activeRoute.snapshot.params.token,
      this.resetForm.value
    );
    if (this.resetForm.valid) {
      setTimeout(() => {
        this.resetForm.reset();
      }, 500);
    }
  }
}
