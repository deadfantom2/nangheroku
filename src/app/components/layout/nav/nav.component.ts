import { Component, OnInit, OnDestroy } from "@angular/core";
import { ThemeService, TokenService } from "../../../_services";
import { Subscription } from "rxjs";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit, OnDestroy {
  public userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(
    private _themeService: ThemeService,
    private _tokenService: TokenService
  ) {}

  ngOnInit() {
    this._themeService.theme;
    this.userIsAuthenticated = this._tokenService.getIsAuth();
    this.authListenerSubs = this._tokenService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  // Change the theme on site
  public changeTheme(): void {
    this._themeService.toggleTheme();
  }
}
