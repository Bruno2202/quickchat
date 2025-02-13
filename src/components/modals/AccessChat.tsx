import { useContext, useState } from "react";
import Button from "../Button";
import { DoorOpen, X } from "lucide-react";
import { ModalContext } from "../../contexts/ModalContext";
import OpacityOverlay from "./OpacityOverlay";
import { motion } from "motion/react"
import Input from "../inputs/Input";
import { ChatController } from "../../core/controllers/ChatController";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";

export default function AccessChat() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [chatId, setChatId] = useState<string>("");

    const { isOpenModal, closeModal } = useContext(ModalContext)!
    const { userData } = useContext(UserContext)!

    const navigation = useNavigate();

    const handleAccessChat = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (userData) {
            setIsLoading(true);
            const chat = await ChatController.accessChat(chatId, userData.getId);
            setIsLoading(false);

            if (chat) {
                navigation(`/${chat.getId}`);
                closeModal("AccessChat");
            }
        }
    };


    return (
        isOpenModal("AccessChat") && (
            <div className="flex items-center justify-center absolute w-full h-full">
                <OpacityOverlay />
                <motion.form
                    layout
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="flex flex-col items-center relative w-auto h-auto p-4 bg-darkGrey rounded-8"
                    onSubmit={handleAccessChat}
                >
                    <div className="flex w-full justify-end">
                        <X
                            className="text-grey hover:text-orange cursor-pointer transition-colors"
                            onClick={() => closeModal("AccessChat")}
                        />
                    </div>
                    <div className="flex flex-row items-center justify-start w-full">
                        <DoorOpen className="text-white mr-2" size={28} />
                        <p className="text-white font-bold w-full text-1.8rem text-start">Acessar conversa</p>
                    </div>
                    <div className="flex flex-row items-center gap-2 mb-4">
                        <p className="text-lightGrey font-medium text-start">Insira o código da conversa para acessá-la!</p>
                    </div>
                    <div className="w-full m-4">
                        <Input
                            placeholder="Código da conversa"
                            maxLength={8}
                            onChange={(e) => setChatId(e.target.value)}
                        />
                    </div>
                    <Button
                        text={"Acessar"}
                        isLoading={isLoading}
                    />
                </motion.form >
            </div >
        )
    );
}