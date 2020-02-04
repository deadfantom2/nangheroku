import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const authRoutes: Routes = [
    {
        path: "login",
        component: LoginComponent,
        data: { title: "Login" }
    },
    {
        path: "register",
        component: RegisterComponent,
        data: { title: "Register" }
    },

    {
        path: "forgot/password",
        component: ForgotPasswordComponent,
        data: { title: "Forgot Password" }
    },
    {
        path: "reset/password",
        component: ResetPasswordComponent,
        data: { title: "Reset Password" }
    }
];

export const AUTH_ROUTES = RouterModule.forChild(authRoutes);
