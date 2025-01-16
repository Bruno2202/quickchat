import { useContext, useState } from "react";
import Button from "../Button";
import { v4 as uuidv4 } from 'uuid';
import { ModalContext } from "../../contexts/ModalContext";
import OpacityOverlay from "./OpacityOverlay";
import Input from "../inputs/Input";
import FormNotes from "../FormNotes";
import { UserContext } from "../../contexts/UserContext";
import { AccessController } from "../../core/controllers/AccessController";
import { UserModel } from "../../core/model/UserModel";

export default function CreateUser() {
    const [username, setUsername] = useState<string>("");

    const { isOpenModal, closeModal } = useContext(ModalContext)!;
    const { setUserData } = useContext(UserContext)!;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (AccessController.validateForm(username)) {
            setUserData(new UserModel(
                uuidv4(),
                username,
            ));

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
                    className=" flex flex-col relative bg-darkGrey w-1/3 h-auto items-center justify-center py-4 px-8 rounded-8"
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