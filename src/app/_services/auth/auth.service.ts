import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import {
  TokenService,
  EntitiesService,
  ApiService,
  ToastService,
  RoutesService
} from "../";
import { User } from "../../_models/user";
import { ResModel } from "../../_models/res-model";

@Injectable()
export class AuthService extends EntitiesService {
  protected type = "api/auth";
  // private link = "https://hnodeangular.herokuapp.com";

  constructor(
    private _tokenService: TokenService,
    public _apiService: ApiService,
    private _toastService: ToastService,
    private _routesService: RoutesService
  ) {
    super(_apiService);
  }

  toto() {
    return this._apiService.get("api/toto");
  }

  // public login(user: User): Observable<ResModel> {
  //   return this._apiService.post(this.type + "/login", user).pipe(
  //     tap(res => {
  //       return this._tokenService.setSession(res);
  //     })
  //   );
  // }

  public register(user: User): Observable<ResModel> {
    return this._apiService.post(this.type + "/register", user).pipe(
      tap(
        res => console.log("Process " + res.message),
        err => console.error(err),
        () => console.log("Complete")
      )
    );
  }

  public login(user: User) {
    return this._apiService.post(this.type + "/login", user).subscribe(res => {
      console.log(res);
      const token = res.token;
      this._tokenService.token = token;
      if (token) {
        const expiresInDuration = res.expiresIn;
        this._tokenService.setAuthTimer(expiresInDuration);
        this._tokenService.isAuthenticated = true;
        this._tokenService.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(
          now.getTime() + expiresInDuration * 1000
        );
        this._tokenService.saveAuthData(token, expirationDate);
        this._toastService.showSuccess(res.message, "Auth");

        setTimeout(() => {
          this._routesService.navigateToRoute("/protect");
        }, 3000);
      }
    });
  }
}
