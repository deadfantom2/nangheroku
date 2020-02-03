import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenService } from 'src/app/auth/token.service';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: "root"
})
export class AuthService {
  private link = "http://localhost:3000";
  // private link = "https://hnodeangular.herokuapp.com";
  private urlPostLogin = this.link + "/api/auth/login";
  private protect = this.link + "/api/toto";

  constructor(private http: HttpClient, private _tokenService: TokenService) {}

  toto() {
    return this.http.get<any>(this.protect);
  }
  
  login(body): Observable<any> {
    return this.http.post<any>(this.urlPostLogin, body).pipe(tap(res => {
      return this._tokenService.setSession(res)
    }));
  }


}
