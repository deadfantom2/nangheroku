import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { TokenService } from "../../_services";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  // private link = "https://hnodeangular.herokuapp.com";
  private urlPostLogin = environment.apiUrl + "/api/auth/login";
  private protect = environment.apiUrl + "/api/toto";

  constructor(private http: HttpClient, private _tokenService: TokenService) {}

  toto() {
    return this.http.get<any>(this.protect);
  }

  login(body): Observable<any> {
    return this.http.post<any>(this.urlPostLogin, body).pipe(
      tap(res => {
        return this._tokenService.setSession(res);
      })
    );
  }
}
