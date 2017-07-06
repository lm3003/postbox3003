var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { ErrorService } from '../errors/error.service';
var UserService = (function () {
    function UserService(httpService, errorService) {
        this.httpService = httpService;
        this.errorService = errorService;
    }
    UserService.prototype.signupUser = function (user) {
        var _this = this;
        var body = JSON.stringify(user);
        var header = new Headers({ 'Content-Type': 'application/json' });
        return this.httpService.post('https://chatbox3003.herokuapp.com/user', body, { headers: header })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    UserService.prototype.signinUser = function (user) {
        var _this = this;
        var body = JSON.stringify(user);
        var header = new Headers({ 'Content-Type': 'application/json' });
        return this.httpService.post('https://chatbox3003.herokuapp.com/user/signin', body, { headers: header })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    UserService.prototype.logout = function () {
        localStorage.clear();
    };
    UserService.prototype.isLoggedin = function () {
        return (localStorage.getItem('token') !== null);
    };
    return UserService;
}());
UserService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, ErrorService])
], UserService);
export { UserService };
