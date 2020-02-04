import { Component, OnInit } from "@angular/core";
import { TitleService } from "./_services/titles/title.service";
import { RoutesService } from './_services/routes/routes.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(private titleService: TitleService, private _routesService: RoutesService) { }
  ngOnInit() {
    // this.titleService.initTitle();
  }

  private navigateToRoute(pathRoute) {
    this._routesService.navigateToRoute(pathRoute);
  }
}
