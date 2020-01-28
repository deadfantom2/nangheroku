import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import { TokenInterceptor } from './auth/token-interceptor';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AllUsersComponent } from "./users/all-users/all-users.component";
import { AllOrdersComponent } from "./users/all-orders/all-orders.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { TestrouteComponent } from './auth/testroute/testroute.component';

import { AuthGuard } from './auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    AllUsersComponent,
    AllOrdersComponent,
    LoginComponent,
    RegisterComponent,
    TestrouteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CookieService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
