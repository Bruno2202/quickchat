import { useContext, useEffect } from "react";
import CreateUser from "../components/modals/CreateUser";
import { ModalContext } from "../contexts/ModalContext";
import WebSocketConnection from "../components/modals/WebSocketConnection";

export default function Login() {
	const { openModal } = useContext(ModalContext)!;

	useEffect(() => {
		openModal("CreateUser");
	}, []);

	return (
		<div className="bg-black w-screen h-screen flex items-center justify-center">
			<WebSocketConnection />
			<CreateUser navigateTo={"/home"} />
		</div>
	)
}