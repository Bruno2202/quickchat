import MessageModel from "./MessageModel";

export default class ChatModel {
    private id: string;
    private ownerId: string;
    private ownerUsername: string;
    private guestId?: string;
    private guestUsername?: string;
    private creation: Date;
    private messages: MessageModel[];

    constructor(id: string, ownerId: string, ownerUsername: string, creation: Date, guestId?: string, guestUsername?: string, messages?: MessageModel[]) {
        this.id = id;
        this.ownerId = ownerId;
        this.ownerUsername = ownerUsername;
        this.creation = typeof creation === 'string' ? new Date(creation) : creation;
        this.guestId = guestId;
        this.guestUsername = guestUsername;
        this.messages = messages ? messages : [];
    }

    get getId(): string { return this.id; }
    get getOwnerId(): string { return this.ownerId; }
    get getOwnerUsername(): string { return this.ownerUsername; }
    get getCreation(): Date { return this.creation; }
    get getGuestId(): string | undefined { return this.guestId; }
    get getGuestUsername(): string | undefined { return this.guestUsername; }
    get getMessages(): MessageModel[] { return this.messages; }

    set setId(id: string) { this.id = id; }
    set setOwnerId(ownerId: string) { this.ownerId = ownerId; }
    set setOwnerUsername(ownerUsername: string) { this.ownerUsername = ownerUsername; }
    set setGuestId(guestId: string) { this.guestId = guestId; }
    set setGuestUsername(guestUsername: string) { this.guestUsername = guestUsername; }
    set setCreation(creation: Date) { this.creation = creation; }
    set setMessages(messages: MessageModel[]) { this.messages = messages; }
}