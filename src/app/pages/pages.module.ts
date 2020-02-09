import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { PagesRoutingModule } from "./pages-routing.module";
import { AllUsersComponent } from "./users/all-users/all-users.component";
import { TestrouteComponent } from "./testroute/testroute.component";
import { PagesComponent } from "./pages.component";
import { AllOrdersComponent } from "./orders/all-orders/all-orders.component";

@NgModule({
  declarations: [
    PagesComponent,
    AllUsersComponent,
    AllOrdersComponent,
    TestrouteComponent
  ],
  exports: [],
  imports: [PagesRoutingModule, CommonModule, RouterModule]
})
export class PagesModule {}
