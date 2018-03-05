import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ChatService {

  constructor() { }

  private socket = io('http://localhost:5000');

}
