import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthUserService, RoutesService } from "src/app/_services";
import { ResModel } from "src/app/_models";
import { Observable } from "rxjs";

@Component({
  selector: "app-activation-link",
  templateUrl: "./activation-link.component.html",
  styleUrls: ["./activation-link.component.scss"],
})
export class ActivationLinkComponent implements OnInit {
  public link$: Observable<ResModel>;
  public timeLeft: number = 3;
  private timer: any;

  constructor(
    private _authUserService: AuthUserService,
    private _activeRoute: ActivatedRoute,
    private _routesService: RoutesService
  ) {}

  ngOnInit(): void {
    this.getActivationPage();
  }

  public getActivationPage(): void {
    this.link$ = this._authUserService.activationOrResetResponse;
    console.log(this.link$.pipe());
    this._authUserService.activateOrResetAccount(
      this._activeRoute.snapshot.params.token,
      "confirmation"
    );

    // Timer redirecting page to page Login in 3 secondes
    // this.timer = setInterval(() => {
    //   if (this.timeLeft > 1) {
    //     this.timeLeft--;
    //   } else {
    //     clearInterval(this.timer);
    //   }
    // }, 1000);
    // setTimeout(() => {
    //   this._routesService.navigateToRoute("/login");
    // }, 3000);
  }
}
