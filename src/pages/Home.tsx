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
import { ChatContext } from "../contexts/ChatContext";
import MessageModel from "../core/model/MessageModel";
import ClosedChat from "../components/modals/ClosedChat";
import NotFoundChat from "../components/modals/NotFoundChat";
import AccessChat from "../components/modals/AccessChat";
// import DevMonitor from "../components/dev/DevMonitor";

export default function Home() {
    const [messages, setMessages] = useState<MessageModel[]>([]);
    const [input, setInput] = useState('');

    const { id: chatId } = useParams();
    const { userData } = useContext(UserContext)!;
    const { socket } = useContext(SocketContext)!;
    const { openModal } = useContext(ModalContext)!;
    const { currentChat, setCurrentChat, setChats } = useContext(ChatContext)!;

    useEffect(() => {
        if (chatId) {
            const handleGetChatData = async () => {
                const chatInfo: ChatModel | null = await ChatController.getChatInfo(chatId);

                handleChatAccess(chatInfo);
            }

            const handleChatAccess = async (chatInfo: ChatModel | null) => {
                if (!chatInfo) {
                    openModal("NotFoundChat");
                    return;
                }

                if (chatInfo.getGuestId && userData?.getId !== chatInfo.getOwnerId && userData?.getId !== chatInfo.getGuestId) {
                    openModal("ClosedChat");
                    return;
                }

                if (!userData) {
                    openModal("CreateUser");
                }

                if (socket) {
                    if (userData && userData.getId !== chatInfo.getOwnerId) {
                        const handleUpdateChat = async () => {
                            try {
                                const updatedChat = new ChatModel(
                                    chatId,
                                    chatInfo.getOwnerId,
                                    chatInfo.getOwnerUsername,
                                    chatInfo.getCreation,
                                    userData?.getId,
                                    userData?.getUsername
                                );

                                await ChatController.updateChat(updatedChat);
                            } catch (error) {
                                console.log(error);
                            }
                        }
                        await handleUpdateChat();
                        setChats(await ChatController.getUserChats(userData.getId));
                    }
                    socket.emit('leaveRoom', currentChat?.getId);

                    const chat: ChatModel | null = await ChatController.getChat(chatId);
                    setCurrentChat(chat);

                    socket.emit('joinRoom', chatId);
                }
            }

            setMessages([]);
            handleGetChatData();
        }
    }, [chatId, userData]);

    useEffect(() => {
        if (chatId && socket) {
            socket.on('receiveMessage', (sentMessage) => {
                const message = new MessageModel(
                    sentMessage.message,
                    sentMessage.senderId,
                    sentMessage.senderUsername,
                    sentMessage.sentAt,
                    sentMessage.id
                );

                setMessages((prev) => [...prev, message]);
            });

            return () => {
                socket.off('receiveMessage');
            };
        }
    }, [chatId, socket]);

    useEffect(() => {
        if (currentChat) {
            const messages: MessageModel[] = currentChat.getMessages;
            const orderMessages = messages.sort((a, b) =>
                new Date(a.getSentAt).getTime() - new Date(b.getSentAt).getTime()
            );
            setMessages(orderMessages);
        }
    }, [currentChat]);

    function handleSendMessage() {
        if (input.trim() && socket && userData && chatId) {
            const message = new MessageModel(
                input,
                userData.getId,
                userData.getUsername,
                new Date()
            );

            socket.emit('sendMessage', { chatId, message });
            setMessages((prev: MessageModel[]) => [...prev, message]);
            setInput('');
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
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
            <ClosedChat />
            <AccessChat />
            <NotFoundChat />
            {/* <DevMonitor /> */}
        </div>
    );
}
