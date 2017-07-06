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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { User } from './user.model';
import { Router } from '@angular/router';
var SignupComponent = (function () {
    function SignupComponent(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    SignupComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.myForm);
        var user = new User(this.myForm.value.email, this.myForm.value.password, this.myForm.value.firstName, this.myForm.value.lastName);
        this.userService.signupUser(user)
            .subscribe(function (result) {
            _this.router.navigate(['/auth', 'signin']);
            console.log(result);
        });
        this.myForm.reset();
    };
    SignupComponent.prototype.ngOnInit = function () {
        this.myForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl(null, Validators.required),
        });
    };
    return SignupComponent;
}());
SignupComponent = __decorate([
    Component({
        selector: 'app-signup',
        templateUrl: './signup.component.html'
    }),
    __metadata("design:paramtypes", [UserService, Router])
], SignupComponent);
export { SignupComponent };
