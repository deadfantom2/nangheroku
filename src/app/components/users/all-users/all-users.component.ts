import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { Observable } from "rxjs";
import {
  UsersService,
  TableService,
  ModalService,
  UserValidationService,
} from "../../../_services";
import { User } from "../../../_models/user";

@Component({
  selector: "app-all-users",
  templateUrl: "./all-users.component.html",
  styleUrls: ["./all-users.component.scss"],
})
export class AllUsersComponent implements OnInit {
  // Async Observable data stream
  public users$: Observable<User[]>;

  // Form
  public createForm: FormGroup;
  public getEmail: AbstractControl;
  public getPassword: AbstractControl;
  public getName: AbstractControl;
  public getSurname: AbstractControl;
  public getAge: AbstractControl;

  // Table
  public columns: object; // table headers name
  public isDesc: boolean = false;
  public tabSortHeaderName: string;
  public tabFilterHeaderName: string;
  public userObject: User[];
  public direction: number;
  private timer: any;
  private preventSimpleClick: boolean = false;

  constructor(
    private _userValidationService: UserValidationService,
    private _usersService: UsersService,
    private _tableService: TableService,
    private _modal: ModalService
  ) {}

  ngOnInit() {
    this.columns = this._tableService.getColumns();
    this.getAllUsers();
    this.createForm = this._userValidationService.createUserForm;
    this._userValidationService.dynamicForm = this.createForm;
    this.createForm.reset();
    this.getEmail = this._userValidationService.getEmail;
    this.getPassword = this._userValidationService.getPassword;
    this.getName = this._userValidationService.getName;
    this.getSurname = this._userValidationService.getSurname;
    this.getAge = this._userValidationService.getAge;
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
    console.log(this.createForm.value);
    this._usersService.addUser(this.createForm.value);
    if (this.createForm.valid) {
      setTimeout(() => {
        this.createForm.reset();
      }, 500);
    }
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
  public doFilterModalByHeader(header: string): void {
    this.preventSimpleClick = true;
    clearTimeout(this.timer);
    this.tabFilterHeaderName = header;
    this._modal.open(header, "filters");
  }

  public filterItem(option: any): void {
    // Filter item
    console.log("filterItem option: ", option);
    this.userObject = option.userPropertyValue;
  }
}
