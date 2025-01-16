import { LoaderCircle, UserRound } from "lucide-react";
import { NavigateFunction, useNavigate } from "react-router";

interface Props {
    id: string;
    color?: string;
    username?: string;
}

export default function ChatPreview({ id, color, username }: Props) {
    const navigate: NavigateFunction = useNavigate();

    return (
        <div onClick={() => navigate(`/home/${id}`)} className="flex flex-row items-center w-full h-8 gap-2 items-cente rounded-8 text-lightGrey font-semibold hover:bg-grey hover:text-white transition-colors cursor-pointer">
            <div className={`flex items-center justify-center bg-[${color}] rounded-8 w-8 h-8`}>
                <UserRound className="text-darkGrey" />
            </div>
            <p>{username}</p>
        </div>
        // <div className="flex flex-row items-center w-full h-8 gap-2 items-cente rounded-8 text-lightGrey hover:bg-grey font-semibold transition-colors cursor-pointer animate-pulse">
        //     <div className={`flex items-center justify-center rounded-8 w-8 h-8`}>
        //         <LoaderCircle className="text-lightGrey animate-spin" />
        //     </div>
        //     <p>Aguardando...</p>
        // </div>
    );
}