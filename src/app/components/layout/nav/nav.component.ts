import { Component, OnInit, OnDestroy } from "@angular/core";
import { ThemeService, TokenService, RoutesService } from "../../../_services";
import { Subscription } from "rxjs";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
})
export class NavComponent implements OnInit, OnDestroy {
  public userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  public navRow = [
    { name: "Users", icone: "fas fa-users", route: "/users" },
    { name: "Alien", icone: "fas fa-address-book", route: "" },
    { name: "Space", icone: "fas fa-address-book", route: "" },
    { name: "Shuttle", icone: "fas fa-address-book", route: "" },
  ];

  constructor(
    private _themeService: ThemeService,
    private _tokenService: TokenService,
    private _routesService: RoutesService
  ) {}

  ngOnInit() {
    this._themeService.theme;
    this.userIsAuthenticated = this._tokenService.getIsAuth();
    // this.authListenerSubs = this._tokenService
    //   .getAuthStatusListener()
    //   .subscribe(isAuthenticated => {
    //     this.userIsAuthenticated = isAuthenticated;
    //   });
  }

  ngOnDestroy() {
    // this.authListenerSubs.unsubscribe();
  }

  /** Log Out user */
  public logout(): void {
    this._tokenService.logout();
  }

  /** Change the theme on site */
  public changeTheme(): void {
    this._themeService.toggleTheme();
  }

  /** Navigate to route */
  public navigateToRoute(pathRoute: string): void {
    this._routesService.navigateToRoute(pathRoute);
  }
}
