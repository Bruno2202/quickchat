import React, { createContext, ReactNode, useState } from "react";
import ChatModel from "../core/model/ChatModel";

interface Props {
    children: ReactNode;
}

interface ChatContextType {
    currentChat: ChatModel | null;
    setCurrentChat: React.Dispatch<React.SetStateAction<ChatModel | null>>;
    chats: ChatModel[];
    setChats: React.Dispatch<React.SetStateAction<ChatModel[]>>;
}

export const ChatContext = createContext<ChatContextType | null>(null);

export default function ChatProvider({ children }: Props) {
    const [currentChat, setCurrentChat] = useState<ChatModel | null>(null);
    const [chats, setChats] = useState<ChatModel[]>([]);

    return (
        <ChatContext.Provider
            value={{ currentChat, setCurrentChat, chats, setChats }}
        >
            {children}
        </ChatContext.Provider>
    );
}