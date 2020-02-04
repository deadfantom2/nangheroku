import { Injectable } from "@angular/core";
import * as jwt_decode from "jwt-decode";
import * as moment from "moment";

@Injectable()
export class TokenService {
  constructor() { }

  public setSession(authResult) {
    const expiresAt = Date.now() + 120000; // expire in 2 minutes
    localStorage.setItem("id_token", authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    this.setPayload();
  }

  public isLoggedIn() {
    return Date.now() < this.getExpiration() ? true : false;;
  }

  public logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("payload");
  }

  private getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return expiresAt;
  }

  private decodedJWT() {
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
  private setPayload() {
    const tokenDecoded = this.decodedJWT();
    return localStorage.setItem("payload", JSON.stringify(tokenDecoded));
  }


}
