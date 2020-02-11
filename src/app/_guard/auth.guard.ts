import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import { TokenService } from "../_services/token.service";
import { RoutesService } from "../_outils/routes.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private _routesService: RoutesService,
    private _tokenService: TokenService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this._tokenService.isLoggedIn();
    if (token) {
      console.log("true token guard");
      return true;
    } else {
      console.log("false token guard");
      this._tokenService.logout();
      this._routesService.navigateToRoute("login");
      return false;
    }
  }
}

// not logged in so redirect to login page with the return url
// this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
