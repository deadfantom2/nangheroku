import { Component, OnInit } from "@angular/core";
import { Observable, pipe, Subscription } from "rxjs";
import { User } from "../../../_models/user";
import { UsersService } from "../../../_services";
import { map, catchError, tap } from "rxjs/operators";

@Component({
  selector: "app-all-users",
  templateUrl: "./all-users.component.html",
  styleUrls: ["./all-users.component.scss"]
})
export class AllUsersComponent implements OnInit {

  // Async Observable data stream
  users$: Observable<User[]>;

  public allUsersNormal: User[];
  public allUsersAsync$: Observable<User[]>;

  constructor(private _usersService: UsersService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  /** GET ALL USERS */
  private getAllUsers() {
    this.users$ = this._usersService.allUsers;
    this._usersService.getAllUsers();
    // return this._usersService.getAll();  // 2 method by protected route
  }

  /** DELETE USER BY ID */
  public deleteUser(user: User) {
    this._usersService.deleteUser(user);
  }


  /** SORTING */
  public doSortName() {
    this._usersService.sortObject();
  }

}
