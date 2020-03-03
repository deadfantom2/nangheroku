import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { User } from "../../_models/user";
import { RoutesService, DateService } from "../../_services";

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
    private router: RoutesService,
    private _dateService: DateService
  ) {}

  ngOnInit(): void {}

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

  public editUser(): void {
    this.router.navigateToRoute("/user");
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
