

import {Http, Headers, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {User} from './user.model';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {ErrorService} from '../errors/error.service';

@Injectable()
export class UserService{

    constructor(private httpService: Http, private errorService: ErrorService) { }

    signupUser(user: User) {
        const body = JSON.stringify(user);
        const header = new Headers({'Content-Type':'application/json'});
        return this.httpService.post('http://localhost:3000/user', body, {headers: header})
            .map((response: Response) => response.json())
            .catch( (error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }


    signinUser(user: User) {
        const body = JSON.stringify(user);
        const header = new Headers({'Content-Type': 'application/json'});
        return this.httpService.post('http://localhost:3000/user/signin', body, {headers: header})
            .map((response: Response) => response.json())
            .catch( (error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    logout() {
        localStorage.clear();
    }

    isLoggedin() {
        return (localStorage.getItem('token')!==null);
    }

}