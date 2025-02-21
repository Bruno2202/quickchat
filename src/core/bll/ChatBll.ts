import ChatModel from "../model/ChatModel";
import { ApiResponse, ChatService } from "../services/ChatService";

export class ChatBll {
    static async createChat(chat: ChatModel): Promise<boolean> {
        if (!chat || !chat.getId || !chat.getOwnerId || !chat.getCreation) {
            return false;
        }

        try {
            await ChatService.createChat(chat);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    static async getUserChats(ownerId: string): Promise<ChatModel[]> {
        try {
            return await ChatService.getUserChats(ownerId);
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    static async getChat(chatId: string): Promise<ChatModel | null> {
        try {
            return await ChatService.getChat(chatId);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async getChatInfo(chatId: string): Promise<ChatModel | null> {
        try {
            return await ChatService.getChatInfo(chatId);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async accessChat(chatId: string, userId: string): Promise<ApiResponse> {
        try {
            const apiRes = await ChatService.accessChat(chatId);
            const userChats = await this.getUserChats(userId);

            for (const chat of userChats) {
                if (chat.getGuestId === apiRes.chat?.getOwnerId || chat.getOwnerId === apiRes.chat?.getOwnerId) {
                    const chatInfo: ApiResponse = {
                        success: true,
                        message: "Você já possui uma conversa com esse participante",
                        error: apiRes.error,
                        chat: null
                    }

                    return chatInfo;
                }
            }

            return apiRes;
        } catch (err: any) {
            return err.response.data;
        }
    }

    static async updateChat(updateChat: ChatModel): Promise<ChatModel | null> {
        try {
            return await ChatService.updateChat(updateChat);
        } catch (error) {
            console.log(error)
            return null
        }
    }
}