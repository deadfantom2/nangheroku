import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./components/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "",
    loadChildren: () => 
      import("./components/components.module").then(m => m.ComponentsModule)
  },
  {
    path: "",
    redirectTo: "/",
    pathMatch: "full"
  },
  { path: "**", redirectTo: "/" }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
