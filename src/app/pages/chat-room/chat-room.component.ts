import { Component } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { Chat } from './chat-room.interface';

@Component({
  selector: 'chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent {
    /**
     * Define Title Or Available Connection
     */
    protected title: string = "";

    /**
     * Define Message
     */
    protected message: string = "";

    /**
     * Define Room
     */
    protected room: string = "";

    /**
     * Current Room
     */
    protected currentRoom: string = "";

    /**
     * Define list of messages
     */
    protected messages: Chat[] = [];

    /**
     * Define Socket
     */ 
    private _socket: Socket = io("http://localhost:3000");

    /**
     * Define User Socket
     */
    private _userSocket: Socket = io("http://localhost:3000/user");

    /**
     * Initialize Data
     */
    public constructor() {
        this._socket.on("connect", () => {
            this.title = `Connected To: ${this._socket.id}`;
        });

        this._socket.on("retrieve-message", (message: string) => {
            this.messages = [...this.messages, {
                text: message,
                type: "chat_type"
            }];
        });

        this._userSocket.on("connect", () => {
            
        });
    }

    /**
     * Send Message Functionality
     */
    protected sendMessage(): void {
        this._socket.emit("send-message", this.message, this.room);
        // Push The Message To The Sender Itself
        this.messages = [...this.messages, {
            text: this.message,
            type: "chat_type"
        }];
        // Remove The Input value after message has been sended
        this.message = "";
    }

    /**
     * Join Room Functionality
     */
    protected joinRoom(): void {
        this._socket.emit("join-room", this.room, this.currentRoom, (message: string, currentRoom: string) => {
            this.currentRoom = currentRoom;
            this.messages = [...this.messages, {
                text: message,
                type: "joined_notification_type"
            }];
        });
    }
}
