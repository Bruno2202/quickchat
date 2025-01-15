import { UserModel } from "../../core/model/UserModel"

interface Props {
    index: number;
    message: {
        chatId: string, sender: string, senderId: string, message: string
    };
    userData: UserModel;
}

export default function Message({ index, userData, message }: Props) {
    return (
        <div key={index} className={`flex ${message.senderId === userData?.getId ? 'justify-end' : 'justify-start'} w-full`}>
            <div className={`flex flex-col ${message.senderId === userData?.getId ? 'bg-grey' : 'bg-blue'} w-auto max-w-4/5 p-2 rounded-8`}>
                {message.senderId !== userData?.getId && (
                    <p className="font-bold">{message.sender}</p>
                )}
                <p className="break-words">
                    {message.message}
                </p>
            </div>
        </div>
    );
}