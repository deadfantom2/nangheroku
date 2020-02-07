import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUsersComponent } from './users/all-users/all-users.component';
import { AllOrdersComponent } from './orders/all-orders/all-orders.component';
import { TestrouteComponent } from './testroute/testroute.component';
import { AuthGuard } from '../_guard/auth.guard';

const pagesRoutes: Routes = [
    {
        path: "users",
        component: AllUsersComponent,
        data: { title: "Users" }
    },
    {
        path: "orders",
        component: AllOrdersComponent,
        data: { title: "Orders" }
    },
    {
        path: "protect",
        component: TestrouteComponent,
        data: { title: "Protect" },
        canActivate: [AuthGuard]
    }
];
@NgModule({
    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
