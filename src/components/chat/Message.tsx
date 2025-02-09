import { AlertTriangle } from "lucide-react";
import MessageModel from "../../core/model/MessageModel";
import { UserModel } from "../../core/model/UserModel"

interface Props {
    index: number;
    message: MessageModel
    userData: UserModel;
}

export default function Message({ index, userData, message }: Props) {
    return (
        message.getId === "alert" ? (
            <div key={index} className={`flex justify-center w-full mb-12`}>
                <div className={`flex flex-row bg-darkGrey w-1/2 p-2 rounded-8`}>
                    <p className="break-words text-orange text-sm text-left">
                        {message.getMessage}
                    </p>
                    <AlertTriangle size={60} className="text-orange" />
                </div>
            </div>
        ) : (
            <div key={index} className={`flex ${message.getSenderId === userData?.getId ? 'justify-end px-4' : 'justify-start'} w-full`}>
                <div className={`flex flex-col ${message.getSenderId === userData?.getId ? 'bg-grey' : 'bg-blue'} w-auto max-w-4/5 p-2 rounded-8`}>
                    {message.getSenderId !== userData?.getId && (
                        <p className="font-bold">{message.getSenderId}</p>
                    )}
                    <p className="break-words">
                        {message.getMessage}
                    </p>
                    <p className="break-words text-xs text-right">
                        {new Date(message.getSentAt).toLocaleString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </p>

                </div>
            </div>
        )
    );
}