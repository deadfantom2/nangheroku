import { Component, OnInit } from "@angular/core";
import { User } from "../../../_models/user";
import { AuthService, RoutesService } from "../../../_services";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  user: User = new User();
  success: boolean;

  constructor(
    private _authService: AuthService,
    private _routesService: RoutesService
  ) { }

  ngOnInit() {
  }

  loginUser(user: User): void {
    console.log(user);
    this._authService.login(user).subscribe(res => {
      this._routesService.navigateToRoute("/protect");
    });
  }
}
