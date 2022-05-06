import {Component} from '@angular/core';
import {WebsocketService} from "../../core/services/websocket.service";

@Component({
  selector: 'app-root',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.css']
})
export class WebsocketComponent {
  title = 'angular8-springboot-websocket';

  greeting: any;
  name?: string;
  constructor(private websocketService: WebsocketService) {
  }

  connect(){
    this.websocketService._connect();
  }

  disconnect(){
    this.websocketService._disconnect();
  }

  sendMessage(){
    this.websocketService._send(this.name);
  }

  handleMessage(message: any){
    this.greeting = this.websocketService.onMessageReceived(message);
  }
}
