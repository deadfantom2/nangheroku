import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../../../_models/user";
import { ToastService, UsersService } from "../../../_services";

@Component({
  selector: "app-all-users",
  templateUrl: "./all-users.component.html",
  styleUrls: ["./all-users.component.scss"]
})
export class AllUsersComponent implements OnInit {
  public allUsers$: Observable<User[]>;

  constructor(
    private usersService: UsersService,
    private _toastService: ToastService
  ) { }

  ngOnInit() {
    this.allUsers$ = this.getAllUsers();
  }

  private getAllUsers(): Observable<User[]> {
    // return this.usersService.getAll(); // 1 method use by link protected entities services
    return this.usersService.getUsers(); // 2 method
  }

}
