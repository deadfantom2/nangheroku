import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AuthService, RoutesService, TitleService, TokenService
} from './services.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthService, RoutesService, TitleService, TokenService
  ],
  declarations: []
})
export class ServiceModule { }
