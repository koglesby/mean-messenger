import { User } from './user.model';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx'
import { Observable } from 'rxjs/Observable';
import { ErrorService } from '../errors/error.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {
    constructor(private http: Http, private errorService: ErrorService) {}

    userName = new Subject<string>();

    signup(user: User) {
        const body = JSON.stringify(user);
        // Headers let backend know getting JSON data
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user', body, {headers: headers})
          .map((response: Response) => {
            return response.json();
          })
          .catch((error: Response) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
          });
        // use map to transform data we get back
    }
    signin(user: User) {
        const body = JSON.stringify(user);
        // Headers let backend know getting JSON data
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
            .map((response: Response) => {
                this.userName.next(response.json().userName);
                localStorage.setItem('userName', response.json().userName);
                return response.json();
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
              });
        // use map to transform data we get back
    }

    logout() {
        localStorage.clear();
        this.userName.next();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }

}