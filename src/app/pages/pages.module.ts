// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { PAGES_ROUTES } from './pages.routes';
import { AllUsersComponent } from './users/all-users/all-users.component';
import { TestrouteComponent } from './testroute/testroute.component';
import { AuthModule } from './auth/auth.module';
import { PagesComponent } from './pages.component';
import { AllOrdersComponent } from './orders/all-orders/all-orders.component';

@NgModule({
    declarations: [
        PagesComponent,
        AllUsersComponent,
        AllOrdersComponent,
        TestrouteComponent,
    ],
    exports: [
        PagesComponent
    ],
    imports: [
        // BrowserModule,
        PAGES_ROUTES,
        AuthModule,
        CommonModule,
        RouterModule
    ]
})
export class PagesModule { }
