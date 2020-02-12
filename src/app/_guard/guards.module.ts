// Modules
import { NgModule } from "@angular/core";

// Guards
import {
  AuthGuard
} from "./";

@NgModule({
  declarations: [],
  providers: [AuthGuard],
  exports: [],
  imports: []
})
export class GuardsModule { }
