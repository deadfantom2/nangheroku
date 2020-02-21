import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  ApiService,
  EntitiesService,
  TokenService,
  TitleService,
  ToastService,
  RoutesService,
  AuthService,
  UsersService,
  UserValidationService
} from "./";

@NgModule({
  imports: [FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiService,
    EntitiesService,
    TokenService,
    TitleService,
    ToastService,
    RoutesService,
    AuthService,
    UsersService,
    UserValidationService
  ],
  declarations: []
})
export class ServiceModule { }
