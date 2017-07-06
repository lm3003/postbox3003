var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { UserService } from './user.service';
var AuthenticationComponent = (function () {
    function AuthenticationComponent(userService) {
        this.userService = userService;
    }
    AuthenticationComponent.prototype.isLoggedin = function () {
        return this.userService.isLoggedin();
    };
    return AuthenticationComponent;
}());
AuthenticationComponent = __decorate([
    Component({
        selector: 'app-authentication',
        template: "\n        <header class=\"row spacing\">\n            <nav class=\"col-md-8 col-md-offset-2\">\n                <ul class=\"nav nav-tabs\">\n                    <li routerLinkActive=\"active\"><a [routerLink]=\"['signup']\">Signup</a></li>\n                    <li routerLinkActive=\"active\"><a *ngIf=\"!isLoggedin()\" [routerLink]=\"['signin']\">Signin</a></li>\n                    <li routerLinkActive=\"active\"><a *ngIf=\"isLoggedin()\" [routerLink]=\"['logout']\">Logout</a></li>\n                </ul>\n            </nav>\n        </header>\n        <div class=\"row spacing\">\n            <router-outlet></router-outlet>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [UserService])
], AuthenticationComponent);
export { AuthenticationComponent };
