import { useContext } from "react";
import Button from "../Button";
import OpacityOverlay from "./OpacityOverlay";
import { ModalContext } from "../../contexts/ModalContext";
import { useNavigate } from "react-router";

export default function ClosedChat() {
    const { isOpenModal, closeModal } = useContext(ModalContext)!;

    const navigate = useNavigate();

    function handleOnClick() {
        closeModal("ClosedChat");
        navigate('/');
    }

    return (
        isOpenModal("ClosedChat") && (
            <div className="flex items-center justify-center absolute w-full h-full">
                <OpacityOverlay onClick={() => handleOnClick()}/>
                <div className="flex flex-col items-center relative w-auto h-auto p-4 bg-darkGrey rounded-8">
                    <div className="flex flex-col gap-2 w-full mb-8 items-center">
                        <p className="text-white font-bold text-1.8rem">Essa conversa está fechada!</p>
                        <div className="flex flex-row items-center gap-2">
                            <p className="text-lightGrey font-medium">Todos os participantes já foram conectados</p>
                        </div>
                    </div>
                    <Button
                        text="Iniciar nova conversa"
                        onClick={() => handleOnClick()}
                    />
                </div>
            </div >
        )
    );
}