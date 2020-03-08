import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { UsersService, TableService, ModalService } from "../../../_services";
import { User } from "../../../_models/user";

@Component({
  selector: "app-all-users",
  templateUrl: "./all-users.component.html",
  styleUrls: ["./all-users.component.scss"]
})
export class AllUsersComponent implements OnInit {
  // Async Observable data stream
  public users$: Observable<User[]>;

  // Form and Table
  public form: FormGroup;
  public columns: object; // table headers name
  public isDesc: boolean = false;
  public tabSortHeaderName: string;
  public tabFilterHeaderName: string;
  public userObject: User[];
  public direction: number;
  private timer: any;
  private preventSimpleClick: boolean = false;

  constructor(
    private _usersService: UsersService,
    private _tableService: TableService,
    private _modal: ModalService
  ) {}

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
  private getAllUsers(): void {
    this.users$ = this._usersService.allUsers;
    console.log(this.users$);
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
        this.isDesc = !this.isDesc; //change the direction
        this.tabSortHeaderName = header;
        this.direction = this.isDesc ? 1 : -1;
      }
    }, 300);
  }

  /** FILTERING */
  public doFilterByHeader(header: string): void {
    this.preventSimpleClick = true;
    clearTimeout(this.timer);
    this.tabFilterHeaderName = header;
    this._modal.open(header, "filters");
  }

  public filterItem(option: any): void {
    this.userObject = option.user;
  }

  /** FILE */
  fileToUpload: File = null;
  public handleFileInput(files: FileList) {
    console.log("files: ", files);
    console.log("files: ", files.item(0));
    this.fileToUpload = files.item(0);
    this._usersService.addProfilePicture(files.item(0));
  }
}
