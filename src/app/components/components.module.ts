// Modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ComponentsRoutingModule } from "./components-routing.module";
import { ReactiveFormsModule } from "@angular/forms";

// Components
import { ComponentsComponent } from "./components.component";
import { AllUsersComponent } from "./users/all-users/all-users.component";
import { AllOrdersComponent } from "./orders/all-orders/all-orders.component";
import { TestrouteComponent } from "./testroute/testroute.component";
import { UserPageComponent } from "../pages";
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { SortByPipe } from '../_pipes/sort-by.pipe';

@NgModule({
  declarations: [
    ComponentsComponent,
    AllUsersComponent,
    AllOrdersComponent,
    TestrouteComponent,
    UserPageComponent,
    UserEditComponent,
    SortByPipe
  ],
  exports: [],
  imports: [
    ComponentsRoutingModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
