import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AllUsersComponent } from "./users/all-users/all-users.component";
import { AllOrdersComponent } from "./users/all-orders/all-orders.component";

const routes: Routes = [
  {
    path: "users",
    component: AllUsersComponent,
    data: { title: "Users" }
  },
  {
    path: "orders",
    component: AllOrdersComponent,
    data: { title: "Orders" }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
