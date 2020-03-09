import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router } from '@angular/router';
import { DateService, UsersService } from "../../_services";
import { User } from "../../_models/user";

@Component({
  selector: "tr[app-user-page]",
  templateUrl: "./user-page.component.html",
  styleUrls: ["./user-page.component.scss"]
})
export class UserPageComponent implements OnInit {
  @Input() public user: User[];
  @Input() public columns: object;

  @Output() public changeAccess = new EventEmitter<User[]>();
  @Output() public changeRole = new EventEmitter<string>();
  @Output() public deleteById = new EventEmitter<User[]>();

  constructor(
    private _usersService: UsersService,
    private _dateService: DateService,
    private routers: Router
  ) { }

  ngOnInit(): void { }

  /** Change name of roles or activation */
  public changeName(name: String) {
    if (typeof name === "boolean") {
      return name ? "Activated" : "Not activated";
    }
  }

  /** Transform the date in format dd/mm/yyyy */
  public changeDateToDDMMYYYY(date: Date) {
    return this._dateService.customDateDDMMYYYY(date);
  }

  public editUser(user: User): void {
    this.routers.navigate(['user', user._id])
  }

  public editAccessUser(): void {
    this.changeAccess.emit();
  }
  public editRoleUser(roleUser: string): void {
    this.changeRole.emit(roleUser);
  }

  public deleteUser(): void {
    this.deleteById.emit();
  }


}
