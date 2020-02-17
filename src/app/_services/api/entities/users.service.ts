import { Injectable } from "@angular/core";
import { EntitiesService } from "./entities.service";
import { ApiService } from "../../api.service";
import { Observable, EMPTY } from "rxjs";
import { User } from "src/app/_models/user";
import { retry, shareReplay, catchError } from "rxjs/operators";

@Injectable()
export class UsersService extends EntitiesService {
  protected type = "api/users";

  users = new Array<User>();

  constructor(_apiService: ApiService) {
    super(_apiService);
  }

  /** Get All Users of User */
  public getUs() {
    return this._apiService.get(this.type).subscribe(res =>
      res.map(item => {
        console.log(
          new User(
            item._id,
            item.name,
            item.surname,
            item.age,
            item.email,
            item.password
          )
        );
        return new User(
          item._id,
          item.name,
          item.surname,
          item.age,
          item.email,
          item.password
        );
      })
    );
  }

  /** Get All Users of User */
  public getUsers(): Observable<User[]> {
    return this._apiService.get(this.type) as Observable<User[]>;
  }

  /** Add a User */
  public addUser(user: User): Observable<User[]> {
    return this._apiService.post(this.type + "/add", user) as Observable<
      User[]
    >;
  }

  /** Add a User */
  public deleteUser(user: User): Observable<User[]> {
    return this._apiService.delete(this.type + "/" + user._id) as Observable<
      User[]
    >;
  }
}
