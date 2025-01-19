export default class ChatModel {
    private id: string;
    private ownerId: string;
    private guestId?: string;
    private creation: Date;

    constructor(id: string, ownerId: string, creation: Date, guestId?: string) {
        this.id = id;
        this.ownerId = ownerId;
        this.guestId = guestId;
        this.creation = creation;
    }

    get getId(): string { return this.id; }
    get getOwnerId(): string { return this.ownerId; }
    get getGuestId(): string | undefined { return this.guestId; }
    get getCreation(): Date { return this.creation; }

    set setId(id: string) { this.id = id; }
    set setOwnerId(ownerId: string) { this.ownerId = ownerId; }
    set setGuestId(guestId: string) { this.guestId = guestId; }
    set setCreation(creation: Date) { this.creation = creation; }
}