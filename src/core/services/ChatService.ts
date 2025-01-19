import axios from "axios";
import ChatModel from "../model/ChatModel";

interface ChatResponse {
    id: string;
    ownerId: string;
    creation: Date;
    guestId?: string;
}

export class ChatService {
    static async createChat(chat: ChatModel) {
        try {
            await axios.post('http://localhost:3000/chat/', {
                chat
            });
        } catch (error) {
            console.error(error);
        }
    }

    static async getUserChats(ownerId: string): Promise<ChatModel[]> {
        try {
            const response = await axios.get(`http://localhost:3000/chat/user/${ownerId}`);

            const chats: ChatModel[] = response.data.map((chat: ChatResponse) => {
                return new ChatModel(
                    chat.id,
                    chat.ownerId,
                    chat.creation,
                    chat.guestId
                )
            })

            return chats;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    static async getChat(chatId: string): Promise<ChatModel | null> {
        try {
            const response = await axios.get(`http://localhost:3000/chat/${chatId}`);

            if (response.data) {
                const chat: ChatModel = new ChatModel(
                    response.data.id,
                    response.data.ownerId,
                    response.data.creation,
                    response.data.guestId
                );

                return chat;
            }

            return null;
        } catch (error) {
            console.error(error);
            return null
        }
    }

    static async updateChat(updateChat: ChatModel): Promise<ChatModel | null> {
        try {
            const response = await axios.put(`http://localhost:3000/chat/`, {
                updateChat
            });

            console.log(response.data)

            if (response.data) {
                const chat: ChatModel = new ChatModel(
                    response.data.id,
                    response.data.ownerId,
                    response.data.creation,
                    response.data.guestId
                );

                return chat;
            }

            return null;
        } catch (error) {
            console.error(error);
            return null
        }
    }
}