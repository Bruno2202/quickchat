import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";

export default function StartChat() {
    const { openModal } = useContext(ModalContext)!

    return (
        <div className="flex flex-1 justify-center items-center font-bold">
            <h1 className="text-1.8rem ">
                Começe uma
                <a className="text-grey hover:text-blue transition-colors duration-300 cursor-pointer" onClick={() => openModal("CreateChat")} > conversa agora!</a>
            </h1>
        </div>
    );
}