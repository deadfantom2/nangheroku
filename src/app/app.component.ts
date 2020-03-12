import { Component, OnInit } from "@angular/core";
import { RoutesService, TitleService, TokenService } from "./_services";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(
    private _titleService: TitleService,
    private _routesService: RoutesService,
    private _tokenService: TokenService
  ) {}

  ngOnInit() {
    this._titleService.initTitle();
    this._tokenService.autoAuthUser();
  }

  // Navigate to route
  public navigateToRoute(pathRoute: string): void {
    this._routesService.navigateToRoute(pathRoute);
  }
}
