import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable, throwError } from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("id_token");
    if (token) {
      const authReq = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token)
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
