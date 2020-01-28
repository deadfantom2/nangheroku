import { TokenService } from './token.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.GetToken();
    const headersConfig = {
      'Content-Type': 'application/json'
    };
    if (token) {
    //   headersConfig['Authorization'] = `beader ${token}`;
      headersConfig['Auth'] = `${token}`;
    }
    const _req = req.clone({ setHeaders: headersConfig, withCredentials: true });
    return next.handle(_req);
  }
}