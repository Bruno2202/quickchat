import MessageModel from "../../core/model/MessageModel";
import { UserModel } from "../../core/model/UserModel";
import Message from "./Message";

interface Props {
    messages: MessageModel[];
    userData: UserModel;
}

export default function Chat({ messages, userData }: Props) {
    return (
        <div id="chat" className="flex flex-col overflow-y-auto h-full gap-1">
            {messages.map((message, index) => (
                <Message
                    key={index}
                    index={index}
                    message={message}
                    userData={userData!}
                />
            ))}
        </div>
    );
}