import { Component, OnInit } from "@angular/core";
import { User } from "../../_models";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { TokenService } from '../token.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_services';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  user: User = new User();
  success: boolean;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() { }

  loginUser(user: User) {
    this.authenticationService.login(user).subscribe(res => {
      this.router.navigate(['/protect']);
    });
  }
}
