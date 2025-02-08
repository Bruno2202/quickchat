import MessageModel from "../../core/model/MessageModel";
import { UserModel } from "../../core/model/UserModel"

interface Props {
    index: number;
    message: MessageModel
    userData: UserModel;
}

export default function Message({ index, userData, message }: Props) {
    return (
        <div key={index} className={`flex ${message.getSenderId === userData?.getId ? 'justify-end' : 'justify-start'} w-full`}>
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
    );
}