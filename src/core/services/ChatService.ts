import ChatModel from "../model/ChatModel";
import MessageModel from "../model/MessageModel";
import api from "../../config/apiConfig";

interface ChatResponse {
    id: string;
    ownerId: string;
    creation: Date;
    guestId?: string;
    messages: MessageResponse[];
}

interface MessageResponse {
    message: string;
    senderId: string;
    sentAt: Date;
    id: string;
}

export class ChatService {
    static async createChat(chat: ChatModel) {
        try {
            await api.post(`/chat`, {
                chat
            });
        } catch (error) {
            console.error(error);
        }
    }

    static async getUserChats(ownerId: string): Promise<ChatModel[]> {
        try {
            const response = await api.get(`/chat/user/${ownerId}`);

            const chats: ChatModel[] = response.data.chats.map((chat: ChatResponse) => {
                return new ChatModel(
                    chat.id,
                    chat.ownerId,
                    chat.creation,
                    chat.guestId,
                    chat.messages?.map((message) => {
                        return new MessageModel(
                            message.message,
                            message.senderId,
                            message.sentAt,
                            message.id
                        );
                    })
                );
            });

            return chats;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    static async getChat(chatId: string): Promise<ChatModel | null> {
        try {
            const response = await api.get(`/chat/${chatId}`);

            if (response.data) {
                const chat: ChatModel = new ChatModel(
                    response.data.chat.id,
                    response.data.chat.ownerId,
                    response.data.chat.creation,
                    response.data.chat.guestId,
                    response.data.chat.messages.map((message: MessageResponse) => {
                        return new MessageModel(
                            message.message,
                            message.senderId,
                            message.sentAt,
                            message.id
                        )
                    })
                );

                return chat;
            }

            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async getChatStatus(chatId: string): Promise<ChatModel | null> {
        try {
            const response = await api.get(`/chat/info/${chatId}`);

            const chat: ChatModel = new ChatModel(
                response.data.chat.id,
                response.data.chat.ownerId,
                response.data.chat.creation,
                response.data.chat.guestId,
            );

            return chat;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async updateChat(updateChat: ChatModel): Promise<ChatModel | null> {
        try {
            const response = await api.put(`/chat`, {
                id: updateChat.getId,
                ownerId: updateChat.getOwnerId,
                creation: updateChat.getCreation,
                guestId: updateChat.getGuestId,
            });

            if (response.data) {
                const chat: ChatModel = new ChatModel(
                    response.data.id,
                    response.data.ownerId,
                    response.data.creation,
                    response.data.guestId,
                    response.data.messages
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