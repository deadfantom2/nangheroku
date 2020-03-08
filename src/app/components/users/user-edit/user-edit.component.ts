import { Component, OnInit } from "@angular/core";
import { User, ResModel } from "../../../_models";
import { UsersService } from "src/app/_services";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.scss"]
})
export class UserEditComponent implements OnInit {
  // Async Observable data stream
  public user$: Observable<User[]>;
  // public user: User;

  constructor(
    private _usersService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getUser();
  }

  public getUser() {
    this.user$ = this._usersService.oneUser;
    this._usersService.getUserById(this.route.snapshot.params.id);
  }

  public getImage(type, image) {
    this._usersService.geImages(type, image);
  }
}
