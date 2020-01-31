import { Injectable } from "@angular/core";
import * as jwt_decode from "jwt-decode";
import * as moment from "moment";

@Injectable({
  providedIn: "root"
})
export class TokenService {
  constructor() { }

  public setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 's'); // add secondes on authResult.expiresIn(number)
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    this.setPayload(authResult);
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration()); // true
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  setPayload(user) {
    const tokenLocal = localStorage.getItem('id_token');
    let payload;
    if (tokenLocal) {
      payload = jwt_decode(user.token);
    }
    console.log(payload)
    localStorage.setItem("payload", JSON.stringify(payload));
    return payload;
  }
  getPayload(){
    const userData = localStorage.getItem("payload");
    return JSON.parse(userData)
  }
}
