import ChatModel from "../model/ChatModel";
import MessageModel from "../model/MessageModel";
import api from "../../config/apiConfig";

interface ChatResponse {
    id: string;
    ownerId: string;
    ownerUsername: string;
    creation: Date;
    guestId?: string;
    guestUsername?: string;
    messages: MessageResponse[];
}

interface MessageResponse {
    message: string;
    senderId: string;
    senderUsername: string;
    sentAt: Date;
    id: string;
}

export interface ApiResponse {
    success: boolean;
    message: string;
    error: string;
    chat: ChatModel | null;
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
                    chat.ownerUsername,
                    chat.creation,
                    chat.guestId,
                    chat.guestUsername,
                    chat.messages?.map((message) => {
                        return new MessageModel(
                            message.message,
                            message.senderId,
                            message.senderUsername,
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
                    response.data.chat.ownerUsername,
                    response.data.chat.creation,
                    response.data.chat.guestId,
                    response.data.chat.guestUsername,
                    response.data.chat.messages.map((message: MessageResponse) => {
                        return new MessageModel(
                            message.message,
                            message.senderId,
                            message.senderUsername,
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

    static async getChatInfo(chatId: string): Promise<ChatModel | null> {
        try {
            const response = await api.get(`/chat/info/${chatId}`);

            if (response.data.chat === null) {
                return response.data.chat;
            }

            const chat: ChatModel = new ChatModel(
                response.data.chat.id,
                response.data.chat.ownerId,
                response.data.chat.ownerUsername,
                response.data.chat.creation,
                response.data.chat.guestId,
                response.data.chat.guestUsername
            );


            return chat;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async accessChat(chatId: string): Promise<ApiResponse> {
        try {
            const response = await api.get(`/chat/info/${chatId}`);

            const { error, message, success, chat } = response.data

            if (!chat) {
                return { chat, success, error, message };
            }

            const chatModel: ChatModel = new ChatModel(
                chat.id,
                chat.ownerId,
                chat.ownerUsername,
                chat.creation,
                chat.guestId,
                chat.guestUsername
            );


            return { success, message, error, chat: chatModel };
        } catch (err: any) {
            const { error, message } = err.response?.data;
            console.log(`Não possível obter dados do chat: ${error ? error : message}`);

            return err.response?.data;
        }
    }

    static async updateChat(updateChat: ChatModel): Promise<ChatModel | null> {
        try {
            const response = await api.put(`/chat`, {
                id: updateChat.getId,
                ownerId: updateChat.getOwnerId,
                ownerUsername: updateChat.getOwnerUsername,
                creation: updateChat.getCreation,
                guestId: updateChat.getGuestId,
                guestUsername: updateChat.getGuestUsername,
            });

            if (response.data) {
                const chat: ChatModel = new ChatModel(
                    response.data.id,
                    response.data.ownerId,
                    response.data.ownerUsername,
                    response.data.creation,
                    response.data.guestId,
                    response.data.guestUsername,
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