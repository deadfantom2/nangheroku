import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  AuthService,
  RoutesService,
  UserValidationService,
  ToastService
} from "../../../_services";
import { Subscription } from "rxjs";
import { FormGroup, AbstractControl } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginSub: Subscription;
  public loginForm: FormGroup;
  public getEmail: AbstractControl;
  public getPassword: AbstractControl;

  constructor(
    private _authService: AuthService,
    private _userValidationService: UserValidationService,
    private _toastService: ToastService,
    private _routesService: RoutesService
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

  ngOnDestroy() {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }

  // public doLoginUser(): void {
  //   this.loginSub = this._authService.login(this.loginForm.value).subscribe(res => {
  //     this._toastService.showSuccess(res.message, "Auth")
  //     setTimeout(() => {
  //       this._routesService.navigateToRoute('/protect');
  //     }, 3000)
  //   });
  // }
  public doLoginUser(): void {
    this._authService.login(this.loginForm.value);
  }
}
