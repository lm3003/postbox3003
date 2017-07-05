
import {NgModule} from '@angular/core';
import {LogoutComponent} from './logout.component';
import {SigninComponent} from './singin.component';
import {SignupComponent} from './signup.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {authRouting} from './auth-routing.component';

@NgModule({
    declarations: [
        SignupComponent,
        SigninComponent,
        LogoutComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        authRouting
    ]
})
export class AuthModule{

}