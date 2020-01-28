import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private urlPostLogin = "https://hnodeangular.herokuapp.com/api/auth/login";
  private protect = "https://hnodeangular.herokuapp.com/api/toto";

  constructor(private http: HttpClient, private router: Router) {}

  login(body): Observable<any> {
    return this.http.post(this.urlPostLogin, body);
  }

  toto() {
    return this.http.get<any>(this.protect);
  }
}
