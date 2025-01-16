import { useContext, useEffect, useState } from "react";
import MessageInput from "../components/inputs/MessageInput";
import Sidebar from "../components/sidebar/Sidebar";
import StartChat from "../components/StartChat";
import { useParams } from "react-router";
import { UserContext } from "../contexts/UserContext";
import Chat from "../components/chat/Chat";
import { SocketContext } from "../contexts/SocketContext";
import CreateChat from "../components/modals/CreateChat";
import { ModalContext } from "../contexts/ModalContext";
import CreateUser from "../components/modals/CreateUser";

export interface MessageType {
    chatId: string;
    sender: string;
    senderId: string;
    message: string;
}

export default function Home() {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [input, setInput] = useState('');

    const { id: chatId } = useParams();
    const { userData } = useContext(UserContext)!
    const { socket } = useContext(SocketContext)!;
    const { openModal } = useContext(ModalContext)!;

    useEffect(() => {
        setMessages([]);
    }, [chatId]);

    useEffect(() => {
        console.log(chatId, socket, userData?.getUsername);
        
        if (chatId && socket) {

            if (!userData?.getUsername) {
                openModal("CreateUser");
            }

            socket.emit('joinRoom', chatId);

            socket.on('receiveMessage', (message: MessageType) => {
                socket.emit('leaveRoom', message);
                setMessages((prev): MessageType[] => [...prev, message]);
            });

            return () => {
                socket.emit('leaveRoom', chatId);
                socket.off('receiveMessage');
            };
        }
    }, [chatId, socket]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    function handleSendMessage() {
        if (input.trim() && socket) {
            const message: MessageType = {
                chatId: chatId!,
                sender: userData!.getUsername,
                senderId: userData!.getId,
                message: input!
            };

            socket.emit('sendMessage', message);
            setMessages((prev: MessageType[]) => [...prev, message]);
            setInput('');
        }
    }

    return (
        <div className="h-screen flex">
            <Sidebar />
            <main className="flex flex-1 flex-col text-white bg-black h-screen items-center overflow-x-hidden">
                <div className="flex flex-col w-2/3 h-full justify-end p-4">
                    {!chatId ? (
                        <StartChat />
                    ) : (
                        <Chat
                            messages={messages}
                            userData={userData!}
                        />
                    )}
                    <MessageInput
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onSend={handleSendMessage}
                        onKeyDown={handleKeyDown}
                        placeholder="Digite alguma mensagem..."
                    />
                </div>
            </main>
            <CreateChat />
            <CreateUser />
        </div>
    );
}
