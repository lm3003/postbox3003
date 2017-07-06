import { RouterModule } from '@angular/router';
import { SigninComponent } from './singin.component';
import { SignupComponent } from './signup.component';
import { LogoutComponent } from './logout.component';
var AUTH_ROUTES = [
    { path: '', redirectTo: 'signup', pathMatch: 'full' },
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'logout', component: LogoutComponent }
];
export var authRouting = RouterModule.forChild(AUTH_ROUTES);
