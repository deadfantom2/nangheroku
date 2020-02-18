import { Component, OnInit } from "@angular/core";
import { Observable, pipe, Subscription } from "rxjs";
import { User } from "../../../_models/user";
import { UsersService } from "../../../_services";
import { map, catchError, tap } from "rxjs/operators";
import { FormGroup, FormControl, Validators } from "@angular/forms";

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

  public form: FormGroup;
  public aSub: Subscription;

  constructor(private _usersService: UsersService) {}

  ngOnInit() {
    this.getAllUsers();
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ]),
      password_confirme: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ])
    });
  }

  /** GET ALL USERS */
  private getAllUsers() {
    this.users$ = this._usersService.allUsers;
    this._usersService.getAllUsers();
    // return this._usersService.getAll();  // 2 method by protected route
  }

  /** CREATE ONE USER  */
  public createUser(user: User) {
    console.log(this.form.value);
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
