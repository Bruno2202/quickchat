import { DoorOpen, House, LogOut, MessageCircle, PanelRightClose, Plus } from "lucide-react";
import Option from "./Option";
import { useContext, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import Footer from "./Footer";
import { ModalContext } from "../../contexts/ModalContext";
import NoMessages from "./NoMessages";
import ChatModel from "../../core/model/ChatModel";
import ChatPreview from "./ChatPreview";
import { ChatContext } from "../../contexts/ChatContext";
import { SocketContext } from "../../contexts/SocketContext";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const { openModal } = useContext(ModalContext)!;
    const { currentChat, setCurrentChat, chats, setChats } = useContext(ChatContext)!;
    const { socket, setSocket } = useContext(SocketContext)!;

    const navigate: NavigateFunction = useNavigate();

    async function handleCreateChat(): Promise<void> {
        openModal("CreateChat");
    }

    async function handleAccessChat(): Promise<void> {
        openModal("AccessChat");
    }

    function handleReturnToHome(): void {
        if (socket) {
            if (currentChat) {
                socket.emit("leaveRoom", currentChat);
            }
            setCurrentChat(null);
            navigate('/home');
        }
    }

    function handleLogOut() {
        sessionStorage.removeItem('token');
        navigate('/');
        socket?.disconnect();
        setSocket(null);
        setCurrentChat(null);
        setChats([]);
    }

    return (
        <aside
            className={`flex flex-col  text-white ${isOpen ? 'w-80 bg-darkGrey p-4' : 'w-0 py-4 bg-black'} duration-300 h-full`}
        >
            {isOpen ? (
                <div className="flex flex-row justify-between mb-4">
                    <>
                        <LogOut
                            className="hover:text-orange transition-all duration-100 ease-in cursor-pointer"
                            onClick={() => handleLogOut()}
                        />
                        <House
                            className="hover:text-blue transition-all duration-100 ease-in cursor-pointer"
                            onClick={() => handleReturnToHome()}
                        />
                    </>
                    <PanelRightClose
                        className="rotate-180 transition-all duration-100 ease-in hover:text-blue cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                    />
                </div>
            ) : (
                <div className="absolute px-4">
                    <PanelRightClose
                        className="transition-all duration-100 ease-in hover:text-blue cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                    />
                </div>
            )}

            {isOpen && (
                <div className="flex flex-col flex-1 gap-4 opacity-100 transition-opacity duration-100 h-full overflow-hidden">
                    <div className="flex flex-col gap-1">
                        <Option onClick={() => handleCreateChat()} Icon={Plus} text="Criar conversa" />
                        <Option onClick={() => handleAccessChat()} Icon={DoorOpen} text="Acessar conversa" />
                    </div>
                    <h1 className="flex flex-row gap-2 items-center text-xl font-bold">
                        <MessageCircle /> Conversas
                    </h1>
                    <div className="flex flex-col flex-1 overflow-y-auto gap-2">
                        {chats && chats.length > 0 ? (
                            chats.map((chat: ChatModel) => (
                                <ChatPreview key={chat.getId} chat={chat} />
                            ))
                        ) : (
                            <NoMessages />
                        )}
                    </div>
                    <Footer />
                </div>
            )}
        </aside>
    );
}