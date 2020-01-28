import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class TokenService {
  constructor(private cookieService: CookieService) {}

  GetToken() {
    return this.cookieService.get("auth");
  }

  SetToken(token) {
    this.cookieService.set(
      "auth",
      token,
      new Date(Date.now() + 60000),
      "/",
      "/",
      true,
      "None"
    );
  }

  DeleteToken() {
    this.cookieService.delete("auth");
  }

  GetPayload() {
    const token = this.GetToken();
    console.log("token: ", token);
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = JSON.parse(window.atob(payload));
    }
    console.log("payload: ", payload);
    return payload;
  }
}
