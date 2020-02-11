import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { TokenService } from "../token.service";
import { User } from 'src/app/_models/user';
import { EntitiesService } from '../api/entities/entities.service';
import { ApiService } from '../api.service';

@Injectable()
export class AuthService extends EntitiesService {

  protected type = 'api/auth';

  // private link = "https://hnodeangular.herokuapp.com";

  constructor(private _tokenService: TokenService,
    public _apiService: ApiService) {
    super(_apiService);
  }

  toto() {
    return this._apiService.get("api/toto");
  }

  public login(user: User): Observable<User[]> {
    return this._apiService.post(this.type + "/login", user).pipe(
      tap(res => {
        return this._tokenService.setSession(res);
      })
    );
  }

  public register(user: User): Observable<User[]> {
    return this._apiService.post(this.type + "/register", user).pipe(
      tap(res => console.log("Process " + res.message),
        err => console.error(err),
        () => console.log("Complete")
      )
    );
  }
}
