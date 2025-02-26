import { useContext, useState } from "react";
import Button from "../Button";
import { ModalContext } from "../../contexts/ModalContext";
import OpacityOverlay from "./OpacityOverlay";
import Input from "../inputs/Input";
import FormNotes from "../FormNotes";
import { UserContext } from "../../contexts/UserContext";
import { AuthController } from "../../core/controllers/AuthController";
import { UserModel } from "../../core/model/UserModel";
import { NavigateFunction, useNavigate } from "react-router";
import { SocketContext } from "../../contexts/SocketContext";
import toast from "react-hot-toast";

interface Props {
    navigateTo?: string;
}

export default function CreateUser({ navigateTo }: Props) {
    const [username, setUsername] = useState<string>("");

    const { isOpenModal, closeModal } = useContext(ModalContext)!;
    const { setUserData } = useContext(UserContext)!;
    const { socket } = useContext(SocketContext)!;

    const navigate: NavigateFunction = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (AuthController.validateForm(username)) {
            if (!socket || !socket.id) {
                toast.error("Conexão inválida. Tente novamente.");
                return;
            }

            const response = await AuthController.login(socket.id, username);
            if (!response) {
                return;
            }

            sessionStorage.setItem("token", response.token);

            setUserData(new UserModel(
                socket.id,
                username,
                []
            ));

            if (navigateTo) {
                navigate(navigateTo);
            }

            closeModal("CreateUser");
        };

    };

    return (
        isOpenModal("CreateUser") && (
            <div className="flex items-center justify-center absolute w-full h-full">
                <OpacityOverlay />
                <form
                    action="none"
                    onSubmit={handleSubmit}
                    className="flex flex-col relative bg-darkGrey h-auto items-center justify-center py-4 px-8 rounded-8"
                >
                    <h1 className="font-bold text-white text-2xl mb-8">
                        QuickChat⚡
                    </h1>
                    <div className="flex flex-col w-full justify-center gap-2 mb-12">
                        <Input maxLength={15} type="text" placeholder="Nome do usuário" onChange={(e) => setUsername(e.target.value)} />
                        <FormNotes />
                    </div>
                    <Button text="Começar" />
                </form>
            </div >
        )
    );
}