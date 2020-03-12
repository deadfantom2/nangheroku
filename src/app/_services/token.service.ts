import { Injectable } from "@angular/core";
import * as jwt_decode from "jwt-decode";
import { Subject } from "rxjs";
import { RoutesService } from "./_outils";

@Injectable()
export class TokenService {
  public isAuthenticated = false;
  public token: string;
  public tokenTimer: any;
  public authStatusListener = new Subject<boolean>();

  constructor(private _routesService: RoutesService) {}

  public getToken() {
    return this.token;
  }

  public getIsAuth() {
    return this.isAuthenticated;
  }

  public getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  public autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  public logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this._routesService.navigateToRoute("/");
  }

  public setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  public decodedJWT() {
    const tokenLocal = localStorage.getItem("id_token");
    let payload;
    if (tokenLocal) {
      payload = jwt_decode(tokenLocal);
    }
    return payload; // return expire value of JWT
  }
  public getPayload() {
    const userData = localStorage.getItem("payload");
    return JSON.parse(userData);
  }
  public saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("id_token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    const tokenDecoded = this.decodedJWT();
    localStorage.setItem("payload", JSON.stringify(tokenDecoded));
  }

  private clearAuthData() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("payload");
  }

  private getAuthData() {
    const token = localStorage.getItem("id_token");
    const expirationDate = localStorage.getItem("expiration");
    const payload = localStorage.getItem("payload");
    if (!token || !expirationDate || !payload) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      payload: payload
    };
  }
}
