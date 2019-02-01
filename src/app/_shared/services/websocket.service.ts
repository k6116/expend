import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class WebsocketService {

  private socket;

  constructor() {
    this.socket = io();
  }

  // connect() {
  //   this.socket = io();
  // }

  sendMessage(message) {
    this.socket.emit('message', message);
  }

  getMessages() {
    const observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      // return () => {
      //   this.socket.disconnect();
      // };
    });
    return observable;
  }

}
