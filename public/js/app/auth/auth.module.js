var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { LogoutComponent } from './logout.component';
import { SigninComponent } from './singin.component';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { authRouting } from './auth-routing.component';
var AuthModule = (function () {
    function AuthModule() {
    }
    return AuthModule;
}());
AuthModule = __decorate([
    NgModule({
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
], AuthModule);
export { AuthModule };
