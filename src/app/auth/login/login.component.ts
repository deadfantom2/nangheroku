import { Component, OnInit } from "@angular/core";
import { User } from "../../models/User";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { TokenService } from '../token.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  user: User = new User();
  success: boolean;

  constructor(private _authService: AuthService, private router: Router) { }

  ngOnInit() { }

  loginUser(user: User) {
    this._authService.login(user).subscribe(res => {
      this.router.navigate(['/protect']);
    });
  }
}
