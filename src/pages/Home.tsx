import { useEffect, useState } from "react";
import MessageInput from "../components/inputs/MessageInput";
import Sidebar from "../components/sidebar/Sidebar";
import StartChat from "../components/StartChat";
import { useParams } from "react-router";
import { io } from "socket.io-client";

const socket = io('http://localhost:3000');

export default function Home() {
    const { id: chatId } = useParams();
    const [messages, setMessages] = useState<Array<{ sender: string; message: string }>>([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        if (chatId) {
            socket.emit('joinRoom', chatId);

            socket.on('receiveMessage', (message: { sender: string; message: string }) => {
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
                sender: 'UsuárioAtual',
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
            <main className="flex flex-1 flex-col text-white bg-black h-screen items-center">
                <div className="flex flex-col w-2/3 h-full justify-end mb-4">
                    {!chatId ? (
                        <StartChat />
                    ) : (
                        <div className="messages-container overflow-y-auto h-4/5">
                            {messages.map((msg, index) => (
                                <div key={index} className="message">
                                    <strong>{msg.sender}: </strong>
                                    <p>{msg.message}</p>
                                </div>
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
