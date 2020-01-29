import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: "root"
})
export class TokenService {
  constructor(private cookieService: CookieService) { }

  GetToken() {
    return this.cookieService.get("auth");
  }

  SetToken(token) {
    this.cookieService.set(
      "auth",
      token,
      new Date(Date.now() + 300000),
      "/",
      "/",
      true,
      "None"
    );
    // this.cookieService.set("auth", token, new Date(Date.now() + 300000));
  }

  DeleteToken() {
    this.cookieService.delete("auth");
  }

  GetPayload() {
    const token = this.GetToken();
    let payload;
    if (token) {
      console.log("jwt_decode(token): ", jwt_decode(token))
      payload = jwt_decode(token);
    }
    return payload;
  }
}
