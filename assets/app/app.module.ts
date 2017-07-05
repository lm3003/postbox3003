import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppComponent } from "./app.component";
import {AuthenticationComponent} from './auth/authentication.component';
import {HeaderComponent} from './header.component';
import {routing} from './app-router.component';
import {HttpModule} from '@angular/http';
import {UserService} from './auth/user.service';
import {ErrorComponent} from './errors/error.component';
import {ErrorService} from './errors/error.service';
import {MessageModule} from './messages/message.module';
import {AuthModule} from './auth/auth.module';

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        HeaderComponent,
        ErrorComponent
    ],
    imports: [
            BrowserModule,
            routing,
            HttpModule,
            MessageModule
    ],
    bootstrap: [AppComponent],
    providers: [
        UserService,
        ErrorService
    ]
})
export class AppModule {
//
}