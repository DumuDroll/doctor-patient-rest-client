import {Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  webSocketEndPoint: string = 'http://localhost:8080/api/ws';
  topic: string = "/topic/users";
  stompClient: any;

  _connect() {
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    this.stompClient.connect({}, function (frame: any) {
      _this.stompClient.subscribe(_this.topic, function (sdkEvent: any) {
        _this.onMessageReceived(sdkEvent);
      });
      //_this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
  }

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error: string) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  _send(message: any) {
    console.log("calling logout api via web socket");
    this.stompClient.send("/app/hello", {}, JSON.stringify(message));
  }

  onMessageReceived(message: any) {
    console.log("Message Recieved from Server :: " + message);
    return JSON.stringify(message.body);
  }
}
