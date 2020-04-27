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
export class IsAuthGuard implements CanActivate {
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
    const token = this._tokenService.getIsAuth();
    if (token) {
      console.log("isAuth token");
      this._routesService.navigateToRoute("/users");
      return false;
    } else {
      console.log("isAuth !token");
      return true;
    }
  }
}
