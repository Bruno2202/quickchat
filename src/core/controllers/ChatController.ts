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

            toast.error("Esse chat não existe");
            return null;
        } catch (error) {
            toast.error("Erro ao recuperar dados da conversa");
            console.log(`Erro ao recuperar dados da conversa: ${error}`);
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