import { Injectable } from "@angular/core";
import { EntitiesService } from "./entities.service";
import { ApiService } from "../../api.service";
import { Observable, EMPTY, BehaviorSubject, ReplaySubject,interval } from "rxjs";
import { User } from "src/app/_models/user";
import { ToastService } from "../../_outils";

@Injectable()
export class UsersService extends EntitiesService {

  protected type = "api/users";

  public allUsers: Observable<User[]>;
  private objectAllUsers: BehaviorSubject<User[]>;

  private listUsers: User[] = [];
  public tempUsers: User[] = [];

  constructor(_apiService: ApiService, private _toast: ToastService) {
    super(_apiService);

    this.objectAllUsers = new BehaviorSubject(null) as BehaviorSubject<User[]>;
    this.allUsers = this.objectAllUsers.asObservable();
  }

  /** Get: All Users of Users */
  public getAllUsers(): void {
    this._apiService.get(this.type).subscribe(
      res => {
        console.log(res.users)
        this.listUsers = res.users;
        this.tempUsers = [...res.users];
        this.objectAllUsers.next(this.listUsers);
        
      },
      error => {
        console.log(error);
      }
    );
  }

  /** Post: Add a User */
  public addUser(user: User): void {
    this._apiService.post(this.type + "/add", user).subscribe(
      res => {
        this.listUsers.unshift(res.user);
        this.tempUsers = [...this.listUsers];
        this.objectAllUsers.next(this.listUsers);
        this._toast.showSuccess(
          "Successfully created an User!",
          "Create an user"
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  /** Patch: change access activation of user */
  public changeRoleUser(user: User, roleUser: string): void {
    this._apiService
      .patch(this.type + "/roles/" + user._id, { roles: roleUser })
      .subscribe(
        res => {
          console.log(res);
          this._toast.showSuccess(
            "Successfully changed role for user " + user.email,
            "Role User"
          );
        },
        error => {
          console.log(error);
        }
      );
  }

  /** Patch: change access activation of user */
  public changeActivationUser(user: User): void {
    this._apiService
      .patch(this.type + "/activations/" + user._id, user)
      .subscribe(
        res => {
          const userSelected = this.listUsers.find(
            userOfList => userOfList._id === res.user._id
          );
          userSelected.isVerified = res.user.isVerified;
          this._toast.showSuccess(
            "Successfully changed access for user " + userSelected.email,
            "Access User"
          );
        },
        error => {
          console.log(error);
        }
      );
  }

  /** Delete: a User */
  public deleteUser(user: User): void {
    this._apiService.delete(this.type + "/" + user._id).subscribe(
      item => {
        const user = this.listUsers.findIndex(
          items => items._id === item.user["_id"]
        );
        this.listUsers.splice(user, 1);
        this.tempUsers = [...this.listUsers];
        this.objectAllUsers.next(this.listUsers);
        this._toast.showSuccess(
          "Successfully deleted an User!",
          "Delete an user"
        );
      },
      error => {
        console.log(error);
      }
    );
  }
}
