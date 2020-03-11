import { Component, OnInit } from "@angular/core";
import { RoutesService, TitleService } from "./_services";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {


  constructor(
    private _titleService: TitleService,
    private _routesService: RoutesService
  ) { }

  ngOnInit() {
    this._titleService.initTitle(); 
  }

  // Navigate to route
  public navigateToRoute(pathRoute: string): void {
    this._routesService.navigateToRoute(pathRoute);
  }

  
}
