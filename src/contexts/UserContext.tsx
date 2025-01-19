import React, { createContext, ReactNode, useEffect, useState } from "react";
import { UserModel } from "../core/model/UserModel";
import { ChatController } from "../core/controllers/ChatController";

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

    useEffect(() => {
        async function handleGetUserChats() {
            if (userData) {
                await ChatController.getUserChats(userData?.getId);
            }
        }
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
