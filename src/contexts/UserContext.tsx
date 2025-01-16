import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { UserModel } from "../core/model/UserModel";
import { SocketContext } from "./SocketContext";

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
    const { socket } = useContext(SocketContext) || {};

    useEffect(() => {
        if (socket) {
            if (userData) {
                userData.setSocketId = socket.id!;
            }
        }
    }, [socket, userData]);

    return (
        <UserContext.Provider value={{
            userData,
            setUserData,
        }}>
            {children}
        </UserContext.Provider>
    );
}
