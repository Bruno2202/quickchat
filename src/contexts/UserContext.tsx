import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { UserModel } from "../core/model/UserModel";
import { ChatController } from "../core/controllers/ChatController";
import { ChatContext } from "./ChatContext";

interface Props {
    children: ReactNode;
}

interface UserContextType {
    userData: UserModel | null;
    setUserData: React.Dispatch<React.SetStateAction<UserModel | null>>;
}

export const UserContext = createContext<UserContextType | null>(null);

export default function UserProvider({ children }: Props) {
    const [userData, setUserData] = useState<UserModel | null>(null);

    const { setChats } = useContext(ChatContext)!;

    useEffect(() => {
        if (!userData) return;

        const handleGetUserChats = async () => {
            try {
                const userChats = await ChatController.getUserChats(userData.getId);
                setChats(userChats);
            } catch (e) {
                console.error("Erro ao buscar chats do usuário:", e);
            }
        };

        handleGetUserChats();
    }, [userData]);

    return (
        <UserContext.Provider value={{
            userData,
            setUserData,
        }}>
            {children}
        </UserContext.Provider>
    );
}
