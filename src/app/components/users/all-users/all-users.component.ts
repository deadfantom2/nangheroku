import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../../../_models/user";
import { UsersService, TableService } from "../../../_services";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-all-users",
  templateUrl: "./all-users.component.html",
  styleUrls: ["./all-users.component.scss"]
})
export class AllUsersComponent implements OnInit {

  // Async Observable data stream
  public users$: Observable<User[]>;

  public allUsersNormal: User[];
  public allUsersAsync$: Observable<User[]>;

  // Form and Table
  public form: FormGroup;
  public columns: Object;  // table headers name
  public isDesc: boolean = false;
  public tabHeaderName: String;
  public direction: number;

  constructor(
    private _usersService: UsersService,
    private _tableService: TableService
  ) { }

  ngOnInit() {
    this.columns = this._tableService.getColumns();
    this.getAllUsers();
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(50)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100)
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
  public createUser() {
    this.form.disable();
    this._usersService.addUser(this.form.value);
    this.form.enable();
  }

  /** DELETE USER BY ID */
  public deleteUser(user: User) {
    this._usersService.deleteUser(user);
  }

  /** SORTING */
  public doSortByHeader(property: String): void {
    this.isDesc = !this.isDesc; //change the direction
    this.tabHeaderName = property;
    this.direction = this.isDesc ? 1 : -1;
  }
}
