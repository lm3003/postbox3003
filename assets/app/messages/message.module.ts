import {NgModule} from '@angular/core';
import {MessageComponent} from './message.component';
import {MessageInputComponent} from './message-input.component';
import {MessageListComponent} from './message-list.component';
import {MessagesComponent} from './messages.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MessageService} from './message.service';

@NgModule({
    declarations: [
        MessageComponent,
        MessageInputComponent,
        MessageListComponent,
        MessagesComponent
    ],
    imports: [
        FormsModule,
        CommonModule
    ],
    providers: [
        MessageService
    ]

})
export class MessageModule {

}