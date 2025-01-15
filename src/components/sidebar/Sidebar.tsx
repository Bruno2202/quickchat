import { House, LogOut, MessageCircle, PanelRightClose, Plus } from "lucide-react";
import ChatPreview from "./ChatPreview";
import NoMesages from "./NoMesages";
import Option from "./Option";
import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const navigate: NavigateFunction = useNavigate();

    return (
        <aside
            className={`flex flex-col p-4 text-white bg-darkGrey ${isOpen ? 'w-80' : ' w-16'} transition-all duration-300`}
        >
            <div className={`flex justify-between mb-4 ${isOpen ? 'flex-row' : 'flex-col-reverse gap-4'}`}>
                <LogOut className="hover:text-orange transition-all duration-100 ease-in cursor-pointer" onClick={() => navigate('/')} />
                <House className="hover:text-blue transition-all duration-100 ease-in cursor-pointer" onClick={() => navigate('/home')} />
                <PanelRightClose className={`${isOpen && 'rotate-180'} transition-all duration-100 ease-in hover:text-blue cursor-pointer`} onClick={() => setIsOpen(!isOpen)} />
            </div>
            <div className={`flex flex-col gap-4 ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
                <div className=" flex flex-col">
                    <Option Icon={Plus} text="Criar conversa" />
                </div>
                <h1 className="flex flex-row gap-2 items-center text-xl font-bold">
                    <MessageCircle /> Conversas
                </h1>
                <div className="flex flex-col h-full overflow-y-auto gap-2 ">
                    <ChatPreview
                        id={"1"}
                        username="Teste 1"
                        color="orange"
                    />
                    {/* <ChatPreview />
                    <ChatPreview />
                    <ChatPreview /> */}
                    <NoMesages />
                </div>
            </div>
        </aside>
    );
}