import { useContext, useEffect, useState } from "react";
import MessageInput from "../components/inputs/MessageInput";
import Sidebar from "../components/sidebar/Sidebar";
import StartChat from "../components/StartChat";
import { useParams } from "react-router";
import { io } from "socket.io-client";
import { UserContext } from "../contexts/UserContext";
import Message from "../components/chat/Message";

const socket = io('http://localhost:3000');

export default function Home() {
    const [messages, setMessages] = useState<Array<{ chatId: string, sender: string, senderId: string, message: string }>>([]);
    const [input, setInput] = useState('');

    const { id: chatId } = useParams();
    const { userData } = useContext(UserContext)!

    useEffect(() => {
        if (chatId) {
            socket.emit('joinRoom', chatId);

            socket.on('receiveMessage', (message: { chatId: string, sender: string, senderId: string, message: string }) => {
                socket.emit('leaveRoom', message);
                setMessages((prev) => [...prev, message]);
            });

            return () => {
                socket.emit('leaveRoom', chatId);
                socket.off('receiveMessage');
            };
        }
    }, [chatId]);

    const sendMessage = () => {
        if (input.trim()) {
            const message = {
                chatId,
                sender: userData?.getUsername,
                senderId: userData?.getId,
                message: input,
            };

            console.log(message)

            socket.emit('sendMessage', message);
            setMessages((prev) => [...prev, message]);
            setInput('');
        }
    };

    return (
        <div className="h-screen flex">
            <Sidebar />
            <main className="flex flex-1 flex-col text-white bg-black h-screen items-center overflow-x-hidden">
                <div className="flex flex-col w-2/3 h-full justify-end p-4">
                    {!chatId ? (
                        <StartChat />
                    ) : (
                        <div className="flex flex-col overflow-y-auto h-full gap-1">
                            {messages.map((msg, index) => (
                                <Message
                                    index={index}
                                    message={msg}
                                    userData={userData!}
                                />
                            ))}
                        </div>
                    )}
                    <MessageInput
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onSend={sendMessage}
                        placeholder="Digite alguma mensagem..."
                    />
                </div>
            </main>
        </div>
    );
}
