
import {Component, OnInit} from '@angular/core';
import {MessageService} from './message.service';
import {Message} from './messages.model';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html',

})
export class MessageInputComponent implements OnInit{
    message: Message;

    constructor(private messageService: MessageService) { }

    ngOnInit() {
        this.messageService.editedMessage.subscribe(
            (message: Message) => {
                this.message = message;
            }
        );

    }
    onSave(form: NgForm) {
        console.log(form.value.content);
            if (this.message) {
                this.message.content = form.value.content;
                this.messageService.updateMessage(this.message)
                    .subscribe(
                        data => console.log(data)
                    );
                this.message = null;
            } else {
                var msg = new Message(form.value.content, 'Aarav');
                this.messageService.addMessage(msg)
                    .subscribe(
                        data => console.log(data)
                    );
            }
        form.resetForm();
    }

    onClear(form: NgForm) {
        this.message = null;
        form.resetForm();
    }

}