export default class ChatModel {
    private ownerId: string;
    private guestId?: string;
    private creation: Date;

    constructor(ownerId: string, creation: Date, guestId?: string) {
        this.ownerId = ownerId;
        this.guestId = guestId;
        this.creation = creation;
    }

    get getOwnerId(): string { return this.ownerId; }
    get getGuestId(): string | undefined { return this.guestId; }
    get getCreation(): Date { return this.creation; }
}