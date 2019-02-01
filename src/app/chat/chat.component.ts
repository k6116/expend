import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { WebsocketService } from '../_shared/services/websocket.service';
import { Subscription } from 'rxjs/Subscription';
import { CacheService } from '../_shared/services/cache.service';
import * as io from 'socket.io-client';
import * as moment from 'moment';
import * as _ from 'lodash';

declare var $: any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css', '../_shared/styles/common.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  @ViewChild('message') message: ElementRef;

  url = 'http://localhost:3000';  // TO-DO BILL: can remove; don't need this, it will be set by default
  socket;
  inputText: string;
  userName: string;
  activeUsers: string;
  subscription1: Subscription;

  userMessage: string;
  messages: any[] = [];
  loggedInUsers: any;

  constructor (
    private websocketService: WebsocketService,
    private cacheService: CacheService
    ) {

  }

  ngOnInit() {

    this.userName = 'Paul'

    // open a client socket
    // this.socket = io();

    // // listen for emits for 'message'
    // this.socket.on('message', message => {
    //   $('#messages').append($('<p>').text(message));
    // });

    this.subscription1 = this.websocketService.getMessages().subscribe(message => {
      this.messages.unshift(message);
      // _.reverse(this.messages);
    });

  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }


  // send message button click
  onSendMessageClick() {

    // get the current time
    const currentTime = moment().format('ddd h:mm:ss a');

    // emit the message
    // this.socket.emit('message', `${this.userName} (${currentTime}): ${this.inputText}`);

    // emit the message
    this.websocketService.sendMessage(`${this.userName} (${currentTime}): ${this.inputText}`);

    // clear the input
    this.inputText = '';

  }

}
