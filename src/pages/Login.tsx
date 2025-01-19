import { useContext, useEffect } from "react";
import CreateUser from "../components/modals/CreateUser";
import { ModalContext } from "../contexts/ModalContext";

export default function Login() {
	const { openModal } = useContext(ModalContext)!;


	useEffect(() => {
		openModal("CreateUser");
	}, []);

	return (
		<div className="bg-black w-screen h-screen flex items-center justify-center">
			<CreateUser navigateTo={"/home"} />
		</div>
	)
}