import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import {
  TokenService,
  EntitiesService,
  ApiService,
  ToastService,
  RoutesService,
} from "..";
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialUser,
} from "angularx-social-login";
import { User, ResModel } from "../../_models";

@Injectable()
export class AuthUserService extends EntitiesService {
  protected type = "api/auth";
  // private link = "https://hnodeangular.herokuapp.com";

  public user: SocialUser;
  private objectRes: BehaviorSubject<ResModel>;
  public activationOrResetResponse: Observable<ResModel>;
  private activationOrReset: ResModel;

  public timeLeft: number;
  private timer: any;

  constructor(
    private _tokenService: TokenService,
    public _apiService: ApiService,
    private _toastService: ToastService,
    private _routesService: RoutesService,
    private _authGoogleFacebookService: AuthService
  ) {
    super(_apiService);

    this.objectRes = new BehaviorSubject(null) as BehaviorSubject<ResModel>;
    this.activationOrResetResponse = this.objectRes.asObservable();

    this.timer = 3;
  }

  toto() {
    return this._apiService.get("api/toto");
  }

  public registerLogin(user: SocialUser): void {
    console.log(user);
    this.signOut();
    this._apiService
      .post(this.type + "/register", {
        name: user.firstName,
        surname: user.lastName,
        email: user.email,
        password: "frfr",
        isVerified: true,
        roles: "ADMIN_ROLE",
        socialAuth: user.provider,
        img: { link: user.photoUrl, route: "profile" },
      })
      .subscribe(
        (res) => {
          this._toastService.showSuccess(res.message, "Auth");
          console.log("res: ", res);
        },
        (err) => console.log(err)
      );
  }

  public register(user: User): Observable<ResModel> {
    return this._apiService.post(this.type + "/register", user).pipe(
      tap(
        (res) => console.log("Process " + res.message),
        (err) => console.error(err),
        () => console.log("Complete")
      )
    );
  }

  public login(user: User) {
    return this._apiService
      .post(this.type + "/login", user)
      .subscribe((res) => {
        console.log(res);
        const token = res.token;
        this._tokenService.token = token;
        if (token) {
          setTimeout(() => {
            const expiresInDuration = res.expiresIn;
            this._tokenService.setAuthTimer(expiresInDuration);
            this._tokenService.isAuthenticated = true;
            this._tokenService.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this._tokenService.saveAuthData(token, expirationDate);
            this._routesService.navigateToRoute("/protect");
          }, 3000);
          this._toastService.showSuccess(res.message, "Auth");
        }
      });
  }

  /** ***************************SOCIAL LOGIN*************************** */
  // Google auth
  public signInWithGoogle(): void {
    this._authGoogleFacebookService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((res) => this.registerLogin(res));
  }
  // Facebook auth
  public signInWithFacebook(): void {
    this._authGoogleFacebookService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((res) => this.registerLogin(res));
  }
  // Log Out
  public signOut(): void {
    this._authGoogleFacebookService.signOut();
  }

  /** Activation account or Reset password */
  public activateOrResetAccount(token: string, typeRoute: string): void {
    this._apiService.get(this.type + "/" + typeRoute + "/" + token).subscribe(
      (res) => {
        console.log("res:::::::::: ", res.success);
        this.activationOrReset = res;
        this.objectRes.next(this.activationOrReset);
      },
      (error) => {
        this.activationOrReset = error;
        this.objectRes.next(this.activationOrReset);

        console.log(error);
        console.log(error.success);
      }
    );
  }

  /** Forgot password */
  public forgotPassword(user: User): void {
    this._apiService
      .post(this.type + "/forgot", { email: user.email })
      .subscribe(
        (res) => {
          this._toastService.showSuccess(res.message, "Forgot password");
        },
        (error) => {
          console.log(error);
        }
      );
  }

  /** Modify the password user */
  public resetPassword(token: string, user: User): void {
    this._apiService
      .patch(this.type + "/reset/" + token, { password: user.password })
      .subscribe(
        (res) => {
          this._toastService.showSuccess(res.message, "Reset password");
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
