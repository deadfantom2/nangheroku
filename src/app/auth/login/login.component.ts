import { Component, OnInit } from "@angular/core";
import { User } from "../../_models";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../_services";
import { RoutesService } from "src/app/routes.service";

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
  ) {}

  ngOnInit() {}

  loginUser(user: User) {
    this._authService.login(user).subscribe(res => {
      this._routesService.navigateToRoute("/protect");
    });
  }
}
