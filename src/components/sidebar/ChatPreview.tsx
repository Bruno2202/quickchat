import { LoaderCircle, UserRound } from "lucide-react";
import { NavigateFunction, useNavigate } from "react-router";
import ChatModel from "../../core/model/ChatModel";
import toast from "react-hot-toast";
import CursorTooltip from "../CursorTooltip";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

interface Props {
    chat: ChatModel;
}

export default function ChatPreview({ chat }: Props) {
    const { userData } = useContext(UserContext)!;
    const navigate: NavigateFunction = useNavigate();

    function handleOnClick() {
        navigate(`/${chat.getId}`);
    }

    async function handleCopyLink(): Promise<void> {
        await navigator.clipboard.writeText(`http://localhost:5173/${chat.getId}`);
        toast("Copiado!", {
            icon: "🔗"
        });
    }

    return (
        (chat.getGuestId ? (
            <div
                className="flex flex-row items-center w-full h-8 gap-2 items-cente rounded-8 text-lightGrey font-semibold hover:bg-grey hover:text-white transition-colors cursor-pointer"
                onClick={() => handleOnClick()}
            >
                <div className={`flex items-center justify-center bg-[blue] rounded-8 w-8 h-8`}>
                    <UserRound className="text-darkGrey" />
                </div>
                {userData?.getId == chat.getOwnerId ? (
                    <p>{chat.getGuestUsername}</p>
                ) : (
                    <p>{chat.getOwnerUsername}</p>
                )}
            </div>
        ) : (
            <CursorTooltip text="🔗 Copiar" position={"bottomRight"}>
                <div
                    className="flex flex-row items-center w-full h-8 gap-2 rounded-8 text-lightGrey hover:bg-grey font-semibold cursor-pointer animate-pulse btnAnimation"
                    onClick={() => handleCopyLink()}
                >
                    <div className={`flex items-center justify-center rounded-8 w-8 h-8`}>
                        <LoaderCircle className="text-lightGrey animate-spin" />
                    </div>
                    <p>Aguardando...</p>
                </div>
            </CursorTooltip>
        ))
    );
}