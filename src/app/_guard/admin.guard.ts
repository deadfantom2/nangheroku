import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import { TokenService, RoutesService } from "../_services";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private _routesService: RoutesService,
    private _tokenService: TokenService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this._tokenService.getPayload();
    console.log(token)

    if (token.roles === "ADMIN_ROLE") {
      console.log("true token ADMIN guard");
      return true;
    } else {
      console.log("false token guard");
      this._tokenService.logout();
      this._routesService.navigateToRoute("login");
      return false;
    }
  }
}
