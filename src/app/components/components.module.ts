// Modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ComponentsRoutingModule } from "./components-routing.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ScrollingModule } from '@angular/cdk/scrolling';

// Components
import { ComponentsComponent } from "./components.component";
import { AllUsersComponent } from "./users/all-users/all-users.component";
import { AllOrdersComponent } from "./orders/all-orders/all-orders.component";
import { TestrouteComponent } from "./testroute/testroute.component";
import { UserPageComponent } from "../pages";
import { UserEditComponent } from './users/user-edit/user-edit.component';
import {
  FilterModalComponent,
  ImageModalComponent,
} from "../modals";


// Pipes
import {
  SortByPipe,
  FilterByPipe,
  UrlFilePipe,
  FileTypePipe
} from "../_pipes";

@NgModule({
  declarations: [
    ComponentsComponent,
    AllUsersComponent,
    AllOrdersComponent,
    TestrouteComponent,
    UserPageComponent,
    UserEditComponent,
    FilterModalComponent,
    ImageModalComponent,
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
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    ScrollingModule
  ],
  entryComponents: [FilterModalComponent]
})
export class ComponentsModule { }
