export class UserModel {
    private id: string;
    private username: string;
    private socketId?: string;

    constructor(id: string, username: string, socketId?: string) {
        this.id = id;
        this.username = username;
        this.socketId = socketId;
    }

    get getId() { return this.id; }
    get getUsername() { return this.username; }
    get getSocketId() { return this.socketId; }

    set setId(id: string) { this.id = id; }
    set setUsername(username: string) { this.username = username; }
    set setSocketId(socketId: string) { this.socketId = socketId; }
} 