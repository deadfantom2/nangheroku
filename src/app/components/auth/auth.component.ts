import { Component, OnInit } from "@angular/core";
import { RoutesService, TokenService } from "src/app/_services";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "auth-pages",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
  public displayMain: boolean;
  constructor(
    private _routesService: RoutesService,
    private _tokenService: TokenService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this._tokenService.autoAuthUser();
    this.hideMainBlock();
  }

  /** Navigate to route */
  public navigateToRoute(pathRoute: string): void {
    this._routesService.navigateToRoute(pathRoute);
  }

  /** If Header Title=Activation hide <main> or display */
  private hideMainBlock() {
    return this.titleService.getTitle() === "Activation"
      ? (this.displayMain = false)
      : (this.displayMain = true);
  }
}
