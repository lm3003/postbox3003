var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Message } from './messages.model';
import { Http, Headers } from '@angular/http';
import { EventEmitter, Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { ErrorService } from '../errors/error.service';
var MessageService = (function () {
    function MessageService(httpService, errorService) {
        this.httpService = httpService;
        this.errorService = errorService;
        this.messages = [];
        this.editedMessage = new EventEmitter();
        this.isEditMode = new EventEmitter();
    }
    MessageService.prototype.addMessage = function (message) {
        var _this = this;
        var header = new Headers({ 'Content-Type': 'application/json' });
        var body = JSON.stringify(message);
        var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.httpService.post('https://chatbox3003.herokuapp.com/message' + token, body, { headers: header })
            .map(function (response) {
            var result = response.json();
            var message = new Message(result.object.content, result.object.user.firstName, result.object._id, result.object.user._id);
            _this.messages.push(message);
            return message;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    MessageService.prototype.deleteMessage = function (message) {
        var _this = this;
        this.messages.splice(this.messages.indexOf(message), 1);
        var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.httpService.delete('https://chatbox3003.herokuapp.com/message/' + message.messageId + token)
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    MessageService.prototype.getMessages = function () {
        var _this = this;
        return this.httpService.get('https://chatbox3003.herokuapp.com/message')
            .map(function (response) {
            var messages = response.json().obj;
            var savedMessages = [];
            for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
                var message = messages_1[_i];
                savedMessages.push(new Message(message.content, message.user.firstName, message._id, message.user._id));
            }
            _this.messages = savedMessages;
            return savedMessages;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    MessageService.prototype.updateMessage = function (message) {
        var _this = this;
        console.log(message);
        var header = new Headers({ 'Content-Type': 'application/json' });
        var body = JSON.stringify(message);
        var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.httpService.patch('https://chatbox3003.herokuapp.com/message/' + message.messageId + token, body, { headers: header })
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    MessageService.prototype.editMessage = function (message) {
        this.editedMessage.emit(message);
        this.isEditMode.emit(true);
    };
    return MessageService;
}());
MessageService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, ErrorService])
], MessageService);
export { MessageService };
