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
import { ChatController } from "../core/controllers/ChatController";
import ChatModel from "../core/model/ChatModel";

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
    const { openModal, isOpenModal } = useContext(ModalContext)!;

    useEffect(() => {
        if (chatId) {
            setMessages([]);

            const handleChatData = async () => {
                try {
                    const chat: ChatModel | null = await ChatController.getChat(chatId);

                    if (chat && userData && socket) {
                        if (chat.getId !== userData?.getId && !chat.getGuestId) {
                            const handleUpdateChat = async () => {
                                try {

                                    const updatedChat = new ChatModel(
                                        chatId,
                                        chat.getOwnerId,
                                        chat.getCreation,
                                        userData?.getId
                                    );

                                    await ChatController.updateChat(updatedChat);

                                    socket.emit('joinRoom', chatId);
                                } catch (error) {
                                    console.log(error);
                                }
                            }
                            handleUpdateChat();
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            handleChatData();
        }
    }, [chatId, userData]);

    useEffect(() => {
        if (chatId && socket) {
            socket.on('receiveMessage', (message: MessageType) => {
                setMessages((prev) => [...prev, message]);
                console.log("A")
            });

            return () => {
                socket.emit('leaveRoom', chatId);
                socket.off('receiveMessage');
            };
        }
    }, [chatId, socket]);

    useEffect(() => {
        if (!userData?.getUsername && !isOpenModal("CreateUser")) {
            openModal("CreateUser");
        }
    }, [openModal, userData?.getUsername, isOpenModal]);

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
