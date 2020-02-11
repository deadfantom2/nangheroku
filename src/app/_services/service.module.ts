import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AuthService, RoutesService, TokenService
} from './services.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthService, RoutesService, TokenService
  ],
  declarations: []
})
export class ServiceModule { }
