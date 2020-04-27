// Modules
import { NgModule } from "@angular/core";

// Guards
import { AuthGuard, IsAuthGuard, AdminGuard } from "./";

@NgModule({
  declarations: [],
  providers: [AuthGuard, IsAuthGuard, AdminGuard],
  exports: [],
  imports: []
})
export class GuardsModule {}
