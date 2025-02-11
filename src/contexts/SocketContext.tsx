import { createContext, ReactNode, useState, useEffect, useContext } from "react";
import { io, Socket } from "socket.io-client";
import { UserContext } from "./UserContext";
import ChatModel from "../core/model/ChatModel";
import { ChatController } from "../core/controllers/ChatController";
import { ChatContext } from "./ChatContext";

interface Props {
    children: ReactNode;
}

interface SocketContextType {
    socket: Socket | null;
    setSocket: React.Dispatch<React.SetStateAction<Socket | null>>
}

export const SocketContext = createContext<SocketContextType | null>(null);

export default function SocketProvider({ children }: Props) {
    const [socketInstance, setSocketInstance] = useState<Socket | null>(null);

    const { userData } = useContext(UserContext)!;
    const { setChats } = useContext(ChatContext)!;

    useEffect(() => {
        if (socketInstance === null) {
            const socket = io(import.meta.env.VITE_API_DOMAIN);

            socket.on('connect', () => {
                setSocketInstance(socket);
            });
        }
    }, [socketInstance]);

    useEffect(() => {
        if (socketInstance && userData) {
            socketInstance.on('guestAccess', () => {
                const handleGetUserChats = async () => {
                    const updatedChats: ChatModel[] = await ChatController.getUserChats(userData.getId);
                    setChats(updatedChats);
                }
                handleGetUserChats();
            });

            return () => {
                socketInstance.off('guestAccess');
            };
        }
    }, [socketInstance, userData]);

    return (
        <SocketContext.Provider
            value={{
                socket: socketInstance,
                setSocket: setSocketInstance
            }}
        >
            {children}
        </SocketContext.Provider>
    );
}
