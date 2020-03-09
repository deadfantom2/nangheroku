// Modules
import { NgModule } from "@angular/core";

// Guards
import {
  AuthGuard,
  AdminGuard
} from "./";

@NgModule({
  declarations: [],
  providers: [AuthGuard, AdminGuard],
  exports: [],
  imports: []
})
export class GuardsModule { }
