import { Component, OnInit } from "@angular/core";
import { User } from "../../Models/User.interface";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  user: User = new User();
  success: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  loginUser(user: User) {
    this.authService.login(user).subscribe(
      res => {
        if (res.success) {
          this.success = true;
        } else {
          this.success = false;
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
