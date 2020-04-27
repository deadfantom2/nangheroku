import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  AuthUserService,
  UserValidationService,
  ToastService,
  RoutesService
} from "../../../_services";
import { FormGroup, AbstractControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService, SocialUser } from "angularx-social-login";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerSub: Subscription;
  public registerForm: FormGroup;
  public getEmail: AbstractControl;
  public getPassword: AbstractControl;
  // public getReCaptcha: AbstractControl;

  public user: SocialUser;
  public loggedIn: boolean;

  constructor(
    private _authUserService: AuthUserService,
    private _authGoogleFacebookService: AuthService,
    private _userValidationService: UserValidationService,
    private _toastService: ToastService,
    private _routesService: RoutesService
  ) {}

  ngOnInit() {
    this.getInfoSocialUser();
    this.registerForm = this._userValidationService.authForm;
    this._userValidationService.dynamicForm = this.registerForm;
    this.registerForm.reset();
    this.getEmail = this._userValidationService.getEmail;
    this.getPassword = this._userValidationService.getPassword;
    // this.getReCaptcha = this._userValidationService.getReCaptcha;
    /** RESET AUTH FORM */
    this.registerForm.setValue({
      email: new Date().getTime() + "@fr.fr",
      password: "frfr",
      confirmPassword: "frfr"
      // recaptcha: null
    });
  }

  ngOnDestroy() {
    if (this.registerSub) {
      this.registerSub.unsubscribe();
    }
  }

  // resolved(captchaRes: string) {
  //   console.log(captchaRes);
  //   console.log(this.registerForm);
  //   this.registerForm.controls["recaptcha"].setValue(captchaRes);
  // }

  public doRegisterUser(): void {
    console.log(this.registerForm.value);
    this.registerSub = this._authUserService
      .register(this.registerForm.value)
      .subscribe(res => {
        this._toastService.showSuccess(res.message, "User created!");
        setTimeout(() => {
          this.registerForm.reset();
          this._routesService.navigateToRoute("/login");
        }, 3000);
      });
  }

  public getInfoSocialUser() {
    this._authGoogleFacebookService.authState.subscribe(user => {
      this.user = user;
      console.log(user);
      this.loggedIn = user != null;
    });
  }

  // Google Auth
  public signGoogle(): void {
    this._authUserService.signInWithGoogle();
  }
  // Facebook auth
  public signFacebook(): void {
    this._authUserService.signInWithFacebook();
  }
  // LogOut Google or Facebook
  public signOut(): void {
    this._authUserService.signOut();
  }

  // Route
  public navigateToPage(path: string): void {
    this._routesService.navigateToRoute(path);
  }
}
