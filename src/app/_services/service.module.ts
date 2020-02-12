import { NgModule } from "@angular/core";
import {
  ApiService,
  EntitiesService,
  TokenService,
  TitleService,
  ToastService,
  RoutesService,
  AuthService,
  UsersService
} from "./";

@NgModule({
  imports: [],
  providers: [
    ApiService,
    EntitiesService,
    TokenService,
    TitleService,
    ToastService,
    RoutesService,
    AuthService,
    UsersService
  ],
  declarations: []
})
export class ServiceModule { }
