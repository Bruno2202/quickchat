import { useEffect, useRef } from "react";
import MessageModel from "../../core/model/MessageModel";
import { UserModel } from "../../core/model/UserModel";
import Message from "./Message";

interface Props {
    messages: MessageModel[];
    userData: UserModel;
}

export default function Chat({ messages, userData }: Props) {
    const chatRef = useRef<HTMLDivElement>(null);
    const lastMessageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView();
        }
    }, [messages]);

    return (
        <div ref={chatRef} className="flex flex-col overflow-y-auto h-full gap-1 pb-4">
            {messages.map((message, index) => (
                <div key={index} ref={index === messages.length - 1 ? lastMessageRef : null}>
                    <Message index={index} message={message} userData={userData!} />
                </div>
            ))}
        </div>
    );
}