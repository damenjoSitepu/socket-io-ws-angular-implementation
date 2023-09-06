import { NgModule } from "@angular/core";
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        ChatRoomComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        ChatRoomComponent,
    ]
})
export class PagesModule {}