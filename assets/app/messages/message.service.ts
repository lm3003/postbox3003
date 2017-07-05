import {Message} from './messages.model';
import {Http, Response, Headers} from '@angular/http';
import {EventEmitter, Injectable} from '@angular/core';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {ErrorService} from '../errors/error.service';

@Injectable()
export class MessageService {
    messages: Message[] = [];
    editedMessage = new EventEmitter<Message>();
    isEditMode = new EventEmitter<boolean>();

    constructor(private httpService: Http, private errorService: ErrorService) { }

    addMessage(message: Message) {
        var header = new Headers({'Content-Type':'application/json'});
        const body = JSON.stringify(message);
        const token = localStorage.getItem('token') ? '?token='+localStorage.getItem('token') : '';
        return this.httpService.post('https://chatbox3003.herokuapp.com/message' + token, body, {headers: header})
            .map((response: Response) => {
                const result = response.json();
                const message = new Message(result.object.content,
                                            result.object.user.firstName ,
                                            result.object._id,
                                            result.object.user._id);
                this.messages.push(message);
                return message;
            })
            .catch( (error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);
        const token = localStorage.getItem('token') ? '?token='+localStorage.getItem('token') : '';
        return this.httpService.delete('https://chatbox3003.herokuapp.com/message/' + message.messageId + token)
            .map((response: Response) => response.json())
            .catch( (error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    getMessages() {
        return this.httpService.get('https://chatbox3003.herokuapp.com/message')
            .map ((response: Response) => {
                const messages = response.json().obj;
                let savedMessages: Message[] = [];
                for (let message of messages) {
                    savedMessages.push(new Message(message.content,
                                                    message.user.firstName ,
                                                    message._id,
                                                    message.user._id));
                }
                this.messages = savedMessages;
                return savedMessages;
            })
            .catch( (error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    updateMessage(message: Message) {
        console.log(message);
        var header = new Headers({'Content-Type':'application/json'});
        const body = JSON.stringify(message);
        const token = localStorage.getItem('token') ? '?token='+localStorage.getItem('token') : '';
        return this.httpService.patch('https://chatbox3003.herokuapp.com/message/' + message.messageId + token, body, {headers: header})
            .map((response: Response) => response.json())
            .catch( (error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    editMessage(message: Message) {
        this.editedMessage.emit(message);
        this.isEditMode.emit(true);
    }

}