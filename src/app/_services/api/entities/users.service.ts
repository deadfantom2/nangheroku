import { Injectable } from "@angular/core";
import { EntitiesService } from "./entities.service";
import { ApiService } from "../../api.service";
import { Observable, EMPTY, BehaviorSubject } from "rxjs";
import { User } from "src/app/_models/user";
import { retry, shareReplay, catchError } from "rxjs/operators";
import { ToastService } from '../../_outils';

@Injectable()
export class UsersService extends EntitiesService {
  protected type = "api/users";

  allUsers: Observable<User[]>;
  private objectAllUsers: BehaviorSubject<User[]>;

  private listUsers: User[] = [];
  private tempUsers: User[] = [];

  constructor(_apiService: ApiService, private _toast: ToastService) {
    super(_apiService);

    this.objectAllUsers = new BehaviorSubject(null) as BehaviorSubject<User[]>;
    this.allUsers = this.objectAllUsers.asObservable();
  }

  /** Get All Users of Users */
  public getAllUsers() {
    this._apiService.get(this.type)
      .subscribe(
        res => {
          this.listUsers = res.users;
          this.tempUsers = [...res.users];
          this.objectAllUsers.next(this.listUsers);
        },
        error => {
          console.log(error);
        });
  }

  /** Add a User */
  public addUser(user: User) {
    return this._apiService.post(this.type + "/add", user).subscribe(res => {

      console.log(res)
      this._toast.showSuccess('Successfully created an User!', 'Create an user')
    },
      error => {
        console.log(error);
      })
  }

  /** Delete a User */
  public deleteUser(user: User) {
    this._apiService.delete(this.type + "/" + user._id).subscribe(item => {
      const dix = this.listUsers.findIndex(items => items._id === item.user['_id']);
      this.listUsers.splice(dix, 1);
      this.tempUsers = [...this.listUsers];
      this.objectAllUsers.next(this.listUsers);
      this._toast.showSuccess('Successfully deleted an User!', 'Delete an user')
    },
      error => {
        console.log(error);
      });
  }


  /** Get All Users Sorted by ASC */
  public sortObject() {
    this.objectAllUsers.value.sort((n1, n2) => n1.name.localeCompare(n2.name));
    return this.objectAllUsers;
  }

}
