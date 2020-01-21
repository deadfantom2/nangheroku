import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AllUsersComponent } from "./users/all-users/all-users.component";

const routes: Routes = [
  {
    path: "users",
    component: AllUsersComponent,
    data: { title: "Users" }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
