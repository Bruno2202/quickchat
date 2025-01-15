import React, { createContext, ReactNode, useState } from "react";
import { UserModel } from "../core/model/UserModel";


interface UserProviderProps {
    children: ReactNode;
}

interface UserContextType {
    userData: UserModel | null;
    setUserData: React.Dispatch<React.SetStateAction<UserModel | null>>;
}

export const UserContext = createContext<UserContextType | null>(null);

export default function UserProvider({ children }: UserProviderProps) {
    const [userData, setUserData] = useState<UserModel | null>(null);

    return (
        <UserContext.Provider value={{
            userData,
            setUserData,
        }}>
            {children}
        </UserContext.Provider>
    );
} 