import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket=io('http://localhost:3000');
//////
joinChatRoom(data){
  this.socket.emit('join',data);
  this.socket.emit('getMessage',data);
}

newUserJoined(){
  let observable=new Observable<{user:String,message:String}>(observer=>{
    this.socket.on('new user joined',(data)=>{
      observer.next(data);
    });
    return()=>{this.socket.disconnect();}
  });
  return observable;
}
////

//////
leaveChatRoom(data){
  this.socket.emit('leave',data);
}
userleft(){
  let observable=new Observable<{user:String,message:String}>(observer=>{
    this.socket.on('left room',(data)=>{
      observer.next(data);
    });
    return()=>{this.socket.disconnect();}
  });
  return observable;
}
//////


////
sendMessage(data){
  this.socket.emit('message',data);
}

newMessageRecived(){
  let observable=new Observable<{user:String,message:String}>(observer=>{
    this.socket.on('new message',(data)=>{
      observer.next(data);
    });
    return()=>{this.socket.disconnect();}
  });
  return observable;
}
////


/////
pastMessageRecived(){
  let observable=new Observable<{user:String,message:String}>(observer=>{
    this.socket.on('past messages',(data)=>{
      observer.next(data);
    });
    return()=>{this.socket.disconnect();}
  });
  return observable;
}
///


  constructor() { }
}
