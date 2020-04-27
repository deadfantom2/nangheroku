import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  ApiService,
  EntitiesService,
  TokenService,
  TitleService,
  ToastService,
  RoutesService,
  TableService,
  ModalService,
  ThemeService,
  DateService,
  AuthUserService,
  UsersService,
  UserValidationService
} from "./";
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider
} from "angularx-social-login";

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      "408547218884-v9lqonin31c1bpm0r5soid7044sup2ok.apps.googleusercontent.com"
    )
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("1636795539811222")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, SocialLoginModule],
  providers: [
    ApiService,
    EntitiesService,
    TokenService,
    TitleService,
    ToastService,
    RoutesService,
    TableService,
    ModalService,
    ThemeService,
    DateService,
    AuthUserService,
    UsersService,
    UserValidationService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  declarations: []
})
export class ServiceModule {}
