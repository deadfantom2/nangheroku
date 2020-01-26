import { Component, OnInit } from "@angular/core";
import { TitleService } from "./title.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(private titleService: TitleService, private router: Router) {}
  ngOnInit() {
    this.titleService.initTitle();
  }

  navigateLogin() {
    this.router.navigateByUrl("/login");
  }
  navigateRegister() {
    this.router.navigateByUrl("/register");
  }
  navigateToUsers() {
    this.router.navigateByUrl("/users");
  }
  navigateToOrders() {
    this.router.navigateByUrl("/orders");
  }
}
