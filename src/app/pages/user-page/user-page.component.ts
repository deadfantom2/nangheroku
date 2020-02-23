import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { User } from "../../_models/user";
import { RoutesService } from "src/app/_services";

@Component({
  selector: "tr[app-user-page]",
  templateUrl: "./user-page.component.html",
  styleUrls: ["./user-page.component.scss"]
})
export class UserPageComponent implements OnInit {
  @Input() user: User[];
  @Input() columns: string[];

  @Output() sortByName = new EventEmitter<User[]>();
  @Output() deleteById = new EventEmitter<User[]>();

  constructor(private router: RoutesService) {}

  ngOnInit(): void {}

  public changeRoleName(name: String) {
    return name.split("_")[0].toLocaleLowerCase();
  }

  public sortName(): void {
    this.sortByName.emit();
  }
  public editUser(): void {
    this.router.navigateToRoute("/user");
  }
  public deleteUser(): void {
    this.deleteById.emit();
  }
}
