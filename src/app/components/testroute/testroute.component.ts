import { Component, OnInit } from "@angular/core";
import { AuthUserService, TokenService } from "../../_services";

@Component({
  selector: "app-testroute",
  templateUrl: "./testroute.component.html",
  styleUrls: ["./testroute.component.scss"]
})
export class TestrouteComponent implements OnInit {
  message: String;
  user: any;

  constructor(
    private _authService: AuthUserService,
    private _tokenService: TokenService
  ) {}

  ngOnInit() {
    this._authService.toto().subscribe(data => {
      console.log(data);
      this.user = this._tokenService.getPayload().name;
      return (this.message = data.message);
    });
  }
}
