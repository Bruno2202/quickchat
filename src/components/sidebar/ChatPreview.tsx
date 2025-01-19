import { LoaderCircle, UserRound } from "lucide-react";
import { NavigateFunction, useNavigate } from "react-router";
import ChatModel from "../../core/model/ChatModel";
import { useContext } from "react";
import { SocketContext } from "../../contexts/SocketContext";

interface Props {
    chat: ChatModel;
}

export default function ChatPreview({ chat }: Props) {
    const navigate: NavigateFunction = useNavigate();

    const { socket } = useContext(SocketContext)!;

    function handleOnClick() {
        navigate(`/home/${chat.getId}`);
        socket?.emit('joinRoom', chat.getId);
    }

    return (
        (chat.getGuestId ? (
            <div onClick={() => handleOnClick()} className="flex flex-row items-center w-full h-8 gap-2 items-cente rounded-8 text-lightGrey font-semibold hover:bg-grey hover:text-white transition-colors cursor-pointer">
                <div className={`flex items-center justify-center bg-[blue] rounded-8 w-8 h-8`}>
                    <UserRound className="text-darkGrey" />
                </div>
                <p>{chat.getGuestId}</p>
            </div>
        ) : (
            <div className="flex flex-row items-center w-full h-8 gap-2 items-cente rounded-8 text-lightGrey hover:bg-grey font-semibold transition-colors cursor-pointer animate-pulse">
                <div className={`flex items-center justify-center rounded-8 w-8 h-8`}>
                    <LoaderCircle className="text-lightGrey animate-spin" />
                </div>
                <p>Aguardando...</p>
            </div>
        ))
    );
}