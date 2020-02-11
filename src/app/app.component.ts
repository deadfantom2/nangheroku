import { Component, OnInit } from "@angular/core";
import { TitleService } from "./_outils/title.service";
import { RoutesService } from "./_outils/routes.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(
    private _titleService: TitleService,
    private _routesService: RoutesService
  ) {}
  ngOnInit() {
    this._titleService.initTitle();
  }

  public navigateToRoute(pathRoute: string) {
    this._routesService.navigateToRoute(pathRoute);
  }
}
