import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { User } from "../models/User.interface";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private urlPostLogin = "http://localhost:3000/api/auth/login";
  public isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  user: User;

  constructor(private http: HttpClient, private router: Router) {
    this.getsToken();
  }

  getToken() {
    console.log("getToken   service ==>", this.token);
    return this.token;
  }

  getIsAuth() {
    console.log("getIsAuth   service ==>", this.isAuthenticated);
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    console.log(
      "this.authStatusListener.asObservable()   === ",
      this.authStatusListener.asObservable()
    );
    return this.authStatusListener.asObservable();
  }

  login(user: User) {
    return this.http.post<any>(this.urlPostLogin, user).pipe(
      map(res => {
        console.log("login= ", res);
        // console.log('login= ',  res.nom)
        this.token = res.token;
        this.user = res.user;
        const expiresInDuration = res.expiresIn;
        // this.nom = res.user.nom;

        setTimeout(() => {
          if (this.token) {
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            this.setToken(this.token, expirationDate, this.user);
            this.router.navigate(["/users"]);
          }
        }, 3000);

        console.log(res);
        console.log(this.token);
        return res;
      })
    );
  }

  logout() {
    this.token = null;
    this.user = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.removeToken();
    this.router.navigate(["/login"]);
  }

  autoAuthUser() {
    const authInformation = this.getsToken();
    console.log(
      "******************-----------/////authInformation///////----------------- ",
      authInformation
    );
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    console.log(
      "******************-----------//////expiresIn///////----------------- ",
      expiresIn
    );
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.user = authInformation.user;
      console.log("autoAuthUser------**-//59----- :  ", this.user);
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      console.log("finished!");
      this.logout();
    }, duration * 1000);
  }

  //GET SET REMOWE TOKEN
  private getsToken() {
    this.token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    // const user = localStorage.getItem('user');
    this.user = JSON.parse(localStorage.getItem("user"));
    if (!this.token || !expirationDate || !this.user) {
      return;
    } else {
      return {
        token: this.token,
        expirationDate: new Date(expirationDate),
        user: this.user
      };
    }
  }

  private setToken(token: string, expirationDate: Date, user: any) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    // localStorage.setItem("user", user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  private removeToken() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("user");
  }
}
