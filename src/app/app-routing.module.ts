import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AllUsersComponent } from "./users/all-users/all-users.component";
import { AllOrdersComponent } from "./users/all-orders/all-orders.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { TestrouteComponent } from './auth/testroute/testroute.component';
// import { AuthGuard } from './auth/auth.guard';
import { AuthGuard } from './_helpers';


const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    data: { title: "Login" }
  },
  {
    path: "register",
    component: RegisterComponent,
    data: { title: "Register" }
  },
  {
    path: "users",
    component: AllUsersComponent,
    data: { title: "Users" }
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
