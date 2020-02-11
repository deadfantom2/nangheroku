import { Component, OnInit } from "@angular/core";
import { User } from "../../../_models/user";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../../_services/auth/auth.service";
import { RoutesService } from "src/app/_services/routes/routes.service";
import { TitleService } from 'src/app/_helpers/title.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  user: User = new User();
  success: boolean;

  constructor(private _titleService: TitleService,
    private _authService: AuthService,
    private _routesService: RoutesService
  ) { }

  ngOnInit() {
    this._titleService.initTitle();
    console.log('login')
  }

  loginUser(user: User) {
    console.log(user)
    this._authService.login(user).subscribe(res => {
      this._routesService.navigateToRoute("/protect");
    });
  }
}
