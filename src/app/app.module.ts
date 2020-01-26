import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllUsersComponent } from './users/all-users/all-users.component';
import { AllOrdersComponent } from './users/all-orders/all-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    AllUsersComponent,
    AllOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
