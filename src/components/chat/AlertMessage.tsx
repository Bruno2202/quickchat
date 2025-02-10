import { AlertTriangle } from "lucide-react";
import MessageModel from "../../core/model/MessageModel";

interface Props {
    index: number;
    message: MessageModel;
}

export default function AlertMessage({ index, message }: Props) {
    return (
        <div key={index} className={`flex justify-center w-full mb-12`}>
            <div className={`flex flex-row items-center justify-center bg-darkGrey w-1/2 p-2 rounded-8`}>
                <p className="break-words text-yellow text-sm text-left">
                    {message.getMessage}
                </p>
                <AlertTriangle size={60} className="text-yellow pl-4 w-auto text-xl" />
            </div>
        </div>
    );
}