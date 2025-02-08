import React, { createContext, ReactNode, useState } from "react";
import ChatModel from "../core/model/ChatModel";

interface Props {
    children: ReactNode;
}

interface ChatContextType {
    currentChat: ChatModel | null;
    setCurrentChat: React.Dispatch<React.SetStateAction<ChatModel | null>>
}

export const ChatContext = createContext<ChatContextType | null>(null);

export default function ChatProvider({ children }: Props) {
    const [currentChat, setCurrentChat] = useState<ChatModel | null>(null);

    return (
        <ChatContext.Provider
            value={{ currentChat, setCurrentChat }}
        >
            {children}
        </ChatContext.Provider>
    );
}