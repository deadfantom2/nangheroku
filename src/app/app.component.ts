import { Component, OnInit } from "@angular/core";
import { TitleService, TokenService } from "./_services";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(
    private _titleService: TitleService,
    private _tokenService: TokenService
  ) {}

  ngOnInit() {
    this._titleService.initTitle();
    this._tokenService.autoAuthUser();
  }
}
