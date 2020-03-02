import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../../../_models/user";
import { UsersService, TableService, ModalService } from "../../../_services";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { FilterModalComponent } from "src/app/modals/filter-modal/filter-modal.component";

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
  public columns: object; // table headers name
  public isDesc: boolean = false;
  public tabHeaderName: string;
  public direction: number;
  private timer: any;
  private preventSimpleClick: boolean = false;

  constructor(
    private _usersService: UsersService,
    private _tableService: TableService,
    private _dialog: MatDialog,
    private _modal: ModalService
  ) {}

  ngOnInit() {
    this._modal.notification.subscribe(() => console.log("moad lfilters"));
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
  private getAllUsers(): void {
    this.users$ = this._usersService.allUsers;
    this._usersService.getAllUsers();
    // return this._usersService.getAll();  // 2 method by protected route
  }

  /** CREATE ONE USER  */
  public createUser(): void {
    this._usersService.addUser(this.form.value);
  }

  /** PATCH ACCOUNT ACTIVATION USER  */
  public changeAccessUser(user: User): void {
    this._usersService.changeActivationUser(user);
  }

  /** PATCH ROLE USER  */
  public changeRoleUser(user: User, roleUser: string): void {
    this._usersService.changeRoleUser(user, roleUser);
  }

  /** DELETE USER BY ID */
  public deleteUser(user: User): void {
    this._usersService.deleteUser(user);
  }

  /** SORTING */
  public doSortByHeader(header: string): void {
    this.timer = 0;
    this.preventSimpleClick = false;

    this.timer = setTimeout(() => {
      if (!this.preventSimpleClick) {
        console.log("sort");
        this.isDesc = !this.isDesc; //change the direction
        this.tabHeaderName = header;
        this.direction = this.isDesc ? 1 : -1;
      }
    }, 300);
  }
  /** FILTERING */
  public doFilterByHeader(property: string, users: []): void {
    this.preventSimpleClick = true;
    clearTimeout(this.timer);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { header: property, users: users };
    dialogConfig.width = "15rem";
    dialogConfig.height = "30rem";

    let dialogRef = this._dialog.open(FilterModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`);
    });
  }

  openModal(id: string) {
    this.preventSimpleClick = true;
    clearTimeout(this.timer);
    this._modal.afficheModal("filters", id);
  }
}
