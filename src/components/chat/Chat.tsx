import { UserModel } from "../../core/model/UserModel";
import Message from "./Message";
import { MessageType } from "../../pages/Home";
import { useEffect } from "react";

interface Props {
    messages: MessageType[];
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