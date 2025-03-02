import toast from "react-hot-toast";
import { ChatBll } from "../bll/ChatBll";
import ChatModel from "../model/ChatModel";

export class ChatController {
    static async createChat(chat: ChatModel): Promise<void> {
        switch (await ChatBll.createChat(chat)) {
            case true:
                toast.success("Sala criada com sucesso!")
                break;

            case false:
                toast.error("Não foi possível criar sala");
                break;

            default:
                toast.error("Erro ao criar sala");
                break;
        };
    }

    static async getUserChats(ownerId: string): Promise<ChatModel[]> {
        try {
            return await ChatBll.getUserChats(ownerId)
        } catch (error) {
            console.log(error)
            return [];
        }
    }

    static async getChat(chatId: string): Promise<ChatModel | null> {
        try {
            const chat: ChatModel | null = await ChatBll.getChat(chatId);

            if (chat) {
                return chat;
            }

            return null;
        } catch (error) {
            toast.error("Erro ao recuperar dados da conversa");
            console.log(`Erro ao recuperar dados da conversa: ${error}`);
            return null;
        }
    }

    static async getChatInfo(chatId: string): Promise<ChatModel | null> {
        try {
            return await ChatBll.getChatInfo(chatId);
        } catch (error) {
            toast.error(`Não foi possível obter status do chat`);
            console.log(`Erro ao checar status do servidor: ${error}`);
            return null;
        }
    }

    static async accessChat(chatId: string, userId: string): Promise<ChatModel | null> {
        try {
            const res = await ChatBll.accessChat(chatId, userId);

            if (res.message || res.error) {
                toast(res.message ? res.message : res.error);
                return null;
            }

            if (res.chat?.getOwnerId && res.chat?.getGuestId) {
                toast("Esta conversa já foi acessada por todos os participantes");
                return null;
            }

            if (res.chat?.getOwnerId === userId || res.chat?.getGuestId === userId) {
                toast("Você já acessou essa conversa");
                return null;
            }

            return res.chat
        } catch (error: any) {
            return null;
        }
    }

    static async updateChat(updateChat: ChatModel): Promise<void> {
        try {
            await ChatBll.updateChat(updateChat);
        } catch (error) {
            console.log(error);
        }
    }
}