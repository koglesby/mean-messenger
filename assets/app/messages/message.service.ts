import { Message } from './message.model';
import { Headers, Http, Response } from '@angular/http';
import { EventEmitter, Injectable } from '@angular/core';
import 'rxjs/Rx'
import { Observable } from 'rxjs/Observable';

@Injectable()
// Adds metadata to allow use of Http service
export class MessageService {
    private messages: Message[] = [];
    messageToEdit = new EventEmitter<Message>();

    constructor(private http: Http) {}

    addMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/message', body, {headers: headers})
          .map((response: Response) => {
            const result = response.json();
            const message = new Message(result.obj.content, 'Dummy', result.obj._id, null);
            this.messages.push(message);
            return message;
          })
          .catch((error: Response) => Observable.throw(error.json()));
        // Should be changed to domain of the real server when app is deployed
        // sets up an observable that HOLDS the request, and allow us to subscribe to any data the request will return
    }

    getMessages() {
        return this.http.get('http://localhost:3000/message')
            .map((response: Response) => {
                const messages = response.json().obj;
                let transformedMessages : Message[] = [];
                for (let message of messages) {
                    transformedMessages.push(new Message(message.content, 'dummy', message._id, null));
                }
                this.messages = transformedMessages;
                return transformedMessages;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    editMessage(message: Message) {
        this.messageToEdit.emit(message);
    }

    updateMessage(message: Message) {
      const body = JSON.stringify(message);
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.patch('http://localhost:3000/message/' + message.messageId, body, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
    }

    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);
    }
}