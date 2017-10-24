import { Message } from './message.model';
import { Headers, Http, Response } from '@angular/http';
import { EventEmitter, Injectable } from '@angular/core';
import 'rxjs/Rx'
import { Observable } from 'rxjs/Observable';
import { ErrorService } from '../errors/error.service';

@Injectable()
// Adds metadata to allow use of Http service
export class MessageService {
    private messages: Message[] = [];
    messageToEdit = new EventEmitter<Message>();

    constructor(private http: Http, private errorService: ErrorService) {}

    addMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post('http://localhost:3000/message' + token, body, {headers: headers})
          .map((response: Response) => {
            const result = response.json();
            const message = new Message(
              result.obj.content,
              result.userName,
              result.obj._id,
              result.obj.user
            );
            this.messages.push(message);
            return message;
          })
          .catch((error: Response) => {
              this.errorService.handleError(error.json());
              return Observable.throw(error.json());
          });

        // Should be changed to domain of the real server when app is deployed
        // sets up an observable that HOLDS the request, and allow us to subscribe to any data the request will return
    }

    getMessages() {
        return this.http.get('http://localhost:3000/message')
            .map((response: Response) => {
                const messages = response.json().obj;
                let transformedMessages : Message[] = [];
                for (let message of messages) {
                    transformedMessages.push(new Message(
                      message.content,
                      message.user.firstName,
                      message._id,
                      message.user._id
                    ));
                }
                this.messages = transformedMessages;
                return transformedMessages;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    editMessage(message: Message) {
        this.messageToEdit.emit(message);
    }

    updateMessage(message: Message) {
      const body = JSON.stringify(message);
      const headers = new Headers({'Content-Type': 'application/json'});
      const token = localStorage.getItem('token')
        ? '?token=' + localStorage.getItem('token')
        : '';
      return this.http.patch('http://localhost:3000/message/' + message.messageId + token, body, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
    }

    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);
        const token = localStorage.getItem('token')
        ? '?token=' + localStorage.getItem('token')
        : '';
        return this.http.delete('http://localhost:3000/message/' + message.messageId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
}