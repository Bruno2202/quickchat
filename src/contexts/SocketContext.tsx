import { createContext, ReactNode, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

interface Props {
    children: ReactNode;
}

interface SocketContextType {
    socket: Socket | null;
}

const socket = io('http://localhost:3000');

export const SocketContext = createContext<SocketContextType | null>(null);

export default function SocketProvider({ children }: Props) {
    const [socketInstance, setSocketInstance] = useState<Socket | null>(null);

    useEffect(() => {
        socket.on('connect', () => {
            setSocketInstance(socket);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider
            value={{ socket: socketInstance }}
        >
            {children}
        </SocketContext.Provider>
    );
}
