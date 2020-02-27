// Modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ComponentsRoutingModule } from "./components-routing.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ScrollingModule } from '@angular/cdk/scrolling';

// Components
import { ComponentsComponent } from "./components.component";
import { AllUsersComponent } from "./users/all-users/all-users.component";
import { AllOrdersComponent } from "./orders/all-orders/all-orders.component";
import { TestrouteComponent } from "./testroute/testroute.component";
import { UserPageComponent } from "../pages";
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { SortByPipe } from '../_pipes/sort-by.pipe';
import { FilterByPipe } from '../_pipes/filter-by.pipe';

@NgModule({
  declarations: [
    ComponentsComponent,
    AllUsersComponent,
    AllOrdersComponent,
    TestrouteComponent,
    UserPageComponent,
    UserEditComponent,
    SortByPipe,
    FilterByPipe
  ],
  exports: [],
  imports: [
    ComponentsRoutingModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ScrollingModule
  ]
})
export class ComponentsModule { }
