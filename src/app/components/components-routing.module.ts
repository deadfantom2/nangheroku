import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllUsersComponent } from "./users/all-users/all-users.component";
import { UserEditComponent } from "./users/user-edit/user-edit.component";
import { AllOrdersComponent } from "./orders/all-orders/all-orders.component";
import { TestrouteComponent } from "./testroute/testroute.component";
import { AuthGuard, AdminGuard } from "../_guard";
import { ComponentsComponent } from "./components.component";

const componentsRoutes: Routes = [
  {
    path: "",
    component: ComponentsComponent,
    children: [
      {
        path: "users",
        component: AllUsersComponent,
        data: { title: "Users" },
        canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: "user/:id",
        component: UserEditComponent,
        data: { title: "User edit" },
        canActivate: [AuthGuard]
      },
      {
        path: "orders",
        component: AllOrdersComponent,
        data: { title: "Orders" }
      },
      {
        path: "protect",
        component: TestrouteComponent,
        data: { title: "Protect" },
        canActivate: [AuthGuard]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(componentsRoutes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule {}
