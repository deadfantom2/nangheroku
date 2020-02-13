// Modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ComponentsRoutingModule } from "./components-routing.module";

// Components
import { ComponentsComponent } from "./components.component";
import { AllUsersComponent } from "./users/all-users/all-users.component";
import { AllOrdersComponent } from "./orders/all-orders/all-orders.component";
import { TestrouteComponent } from "./testroute/testroute.component";
import { UserPageComponent } from '../pages'

@NgModule({
  declarations: [
    ComponentsComponent,
    AllUsersComponent,
    AllOrdersComponent,
    TestrouteComponent, UserPageComponent
  ],
  exports: [],
  imports: [ComponentsRoutingModule, CommonModule, RouterModule]
})
export class PagesModule { }
