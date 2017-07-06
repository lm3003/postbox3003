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
import { MessageService } from './message.service';
import { Message } from './messages.model';
var MessageInputComponent = (function () {
    function MessageInputComponent(messageService) {
        this.messageService = messageService;
    }
    MessageInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.messageService.editedMessage.subscribe(function (message) {
            _this.message = message;
        });
    };
    MessageInputComponent.prototype.onSave = function (form) {
        console.log(form.value.content);
        if (this.message) {
            this.message.content = form.value.content;
            this.messageService.updateMessage(this.message)
                .subscribe(function (data) { return console.log(data); });
            this.message = null;
        }
        else {
            var msg = new Message(form.value.content, 'Aarav');
            this.messageService.addMessage(msg)
                .subscribe(function (data) { return console.log(data); });
        }
        form.resetForm();
    };
    MessageInputComponent.prototype.onClear = function (form) {
        this.message = null;
        form.resetForm();
    };
    return MessageInputComponent;
}());
MessageInputComponent = __decorate([
    Component({
        selector: 'app-message-input',
        templateUrl: './message-input.component.html',
    }),
    __metadata("design:paramtypes", [MessageService])
], MessageInputComponent);
export { MessageInputComponent };
