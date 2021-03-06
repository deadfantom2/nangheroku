import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError, EMPTY } from "rxjs";
import { catchError } from "rxjs/operators";

import { TokenService } from "../_services/token.service";
import { RoutesService, ToastService } from "../_services";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private _tokenService: TokenService,
    private _routesService: RoutesService,
    private _toastService: ToastService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        console.log("err interceptor: ", err);
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this._tokenService.logout();
          this._routesService.navigateToRoute("login");
        }

        // const error = err.error.message || err.statusText;
        this._toastService.showError(err.error.message, "");
        return throwError(err.error);
        // return EMPTY;
      })
    );
  }
}
