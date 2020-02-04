import { RouterModule, Routes } from '@angular/router';
import { AllUsersComponent } from './users/all-users/all-users.component';
import { AllOrdersComponent } from './orders/all-orders/all-orders.component';
import { TestrouteComponent } from './testroute/testroute.component';
import { AuthGuard } from '../_guard/auth.guard';
import { AuthComponent } from './auth/auth.component';

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
    },
    {
        path: '',
        component: AuthComponent,
        loadChildren: './auth/auth.module#AuthModule'
    },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
