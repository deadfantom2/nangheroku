import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { TokenService } from "../_services/token.service";
import { RoutesService } from "../_services/routes/routes.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private _tokenService: TokenService,
    private _routesService: RoutesService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401 || err.status === 403) {
          // auto logout if 401 and 403 response returned from api
          this._tokenService.logout();
          this._routesService.navigateToRoute("login");
          //   location.reload(true); // ?????
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
