import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private injector: Injector) { }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    let errorMsg;
    if (err.status === 401 || err.status === 403) {
      errorMsg = err.error.message;
      this.injector.get(Router).navigateByUrl(`/login`);
    }
    return throwError(errorMsg);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("id_token");
    if (token) {
      const authReq = req.clone({ headers: req.headers.set("Authorization", "Bearer " + token) });
      return next.handle(authReq).pipe(catchError(err => this.handleAuthError(err)));
    }
    else {
      return next.handle(req);
    }
  }
}