import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import {
//   RecaptchaModule,
//   RecaptchaFormsModule,
//   RECAPTCHA_LANGUAGE,
//   RECAPTCHA_SETTINGS,
//   RecaptchaSettings
// } from "ng-recaptcha";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { AuthFormComponent } from "../../validation-form";
import { ActivationLinkComponent } from './activation-link/activation-link.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AuthFormComponent,
    ActivationLinkComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // RecaptchaModule,
    // RecaptchaFormsModule,
    AuthRoutingModule
  ],
  providers: [
    // {
    //   provide: RECAPTCHA_LANGUAGE,
    //   useValue: "fr"
    // },
    // {
    //   provide: RECAPTCHA_SETTINGS,
    //   useValue: {
    //     siteKey: "6LdL2eQUAAAAAEeM2jxQzdWJklTFdaNIejMSSLTr"
    //   } as RecaptchaSettings
    // }
  ]
})
export class AuthModule {}

// https://stackoverflow.com/questions/41165940/google-recaptcha-reset-in-typescript?noredirect=1&lq=1
