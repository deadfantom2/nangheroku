import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { TokenService } from "../auth/token.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private _tokenService: TokenService) {}

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
      this.router.navigate(["/login"]);
      return false;
    }
  }
}

// not logged in so redirect to login page with the return url
// this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
