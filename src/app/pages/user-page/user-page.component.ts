import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { User } from "../../_models/user";
import { RoutesService, DateService } from "../../_services";

@Component({
  selector: "tr[app-user-page]",
  templateUrl: "./user-page.component.html",
  styleUrls: ["./user-page.component.scss"]
})
export class UserPageComponent implements OnInit {
  @Input() user: User[];
  @Input() columns: Object;

  @Output() deleteById = new EventEmitter<User[]>();

  constructor(private router: RoutesService, private _dateService: DateService) { }

  ngOnInit(): void { }

  /** Change name of roles or activation */
  public changeName(name: String) {
    if (typeof name === "string") {
      return name.split("_")[0].toLocaleLowerCase(); // only return admin or user
    }
    if (typeof name === "boolean") {
      return name ? 'Activated' : 'Not activated'
    }
  }

  /** Transform the date in format dd/mm/yyyy */
  public changeDateToDDMMYYYY(date: Date) {
    return this._dateService.customDateDDMMYYYY(date)
  }

  public editUser(): void {
    this.router.navigateToRoute("/user");
  }

  public deleteUser(): void {
    this.deleteById.emit();
  }
}
