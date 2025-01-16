import { useContext, useEffect, useState } from "react";
import Button from "../Button";
import { CircleAlert, Link } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { ModalContext } from "../../contexts/ModalContext";
import toast from "react-hot-toast";
import OpacityOverlay from "./OpacityOverlay";

export default function CreateChat() {
    const [time, setTime] = useState<number>(3);
    const [chatLink, setChatLink] = useState<string>("");

    const { isOpenModal, closeModal } = useContext(ModalContext)!;

    useEffect(() => {
        setChatLink(`http://localhost:5173/home/${uuidv4().slice(0, 8)}`);
    }, []);

    useEffect(() => {
        if (isOpenModal("CreateChat")) {
            if (time === 0) {
                return
            };

            const intervalId = setInterval(() => {
                setTime((prevTime: number) => {
                    if (prevTime === 0) {
                        clearInterval(intervalId);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [isOpenModal, time]);

    async function handleCopyLink(): Promise<void> {
        await navigator.clipboard.writeText(chatLink);
        toast("Copiado!", {
            icon: "🔗"
        });
        closeModal("CreateChat");
        setTime(3);
    }

    return (
        isOpenModal("CreateChat") && (
            <div className="flex items-center justify-center absolute w-full h-full">
                <OpacityOverlay />
                <div className="flex flex-col items-center relative w-auto h-auto p-4 bg-darkGrey rounded-8">
                    <p className="text-white font-bold text-1.8rem">Um link para acesso à sala foi gerado!</p>
                    <div className="flex flex-row items-center gap-2">
                        <Link className="text-lightGrey" size={20} />
                        <p className="text-lightGrey font-medium">Copie-o e envie para outra pessoa para iniciar a conversa</p>
                    </div>
                    <div className="flex flex-col gap-2 items-start w-full my-8">
                        <div className="flex flex-row items-center gap-2">
                            <CircleAlert className="text-orange" size={20} />
                            <p className="text-sm text-orange font-medium">Garanta que o convite seja enviado à pessoa certa</p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <CircleAlert className="text-orange" size={20} />
                            <p className="text-sm text-orange font-medium">Depois que outro usuário entrar, mais ninguém poderá acessar a conversa</p>
                        </div>
                    </div>
                    <Button
                        text={time === 0 ? "Copiar link" : time as unknown as string}
                        onClick={() => handleCopyLink()}
                        disabled={time === 0 ? false : true}
                    />
                </div>
            </div >
        )
    );
}