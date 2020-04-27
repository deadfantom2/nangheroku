// Modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ComponentsRoutingModule } from "./components-routing.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ScrollingModule } from "@angular/cdk/scrolling";

// Components
import { NavComponent } from "./layout/nav/nav.component";
import { ComponentsComponent } from "./components.component";
import { AllUsersComponent } from "./users/all-users/all-users.component";
import { AllOrdersComponent } from "./orders/all-orders/all-orders.component";
import { TestrouteComponent } from "./testroute/testroute.component";
import { UserPageComponent } from "../pages";
import { UserEditComponent } from "./users/user-edit/user-edit.component";
import { FilterModalComponent, ImageModalComponent } from "../modals";
import { UserFormComponent } from "../validation-form";

// Pipes
import { SortByPipe, FilterByPipe, UrlFilePipe, FileTypePipe } from "../_pipes";

@NgModule({
  declarations: [
    NavComponent,
    ComponentsComponent,
    AllUsersComponent,
    AllOrdersComponent,
    TestrouteComponent,
    UserPageComponent,
    UserEditComponent,
    FilterModalComponent,
    ImageModalComponent,
    UserFormComponent,
    SortByPipe,
    FilterByPipe,
    UrlFilePipe,
    FileTypePipe
  ],
  exports: [],
  imports: [
    ComponentsRoutingModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ScrollingModule
  ],
  entryComponents: [FilterModalComponent]
})
export class ComponentsModule {}
