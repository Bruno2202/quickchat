import Input from "../components/inputs/Input";
import Button from "../components/Button";
import { NavigateFunction, useNavigate } from "react-router";
import { useState } from "react";
import { AccessBll } from "../core/bll/AccessBll";
import FormNotes from "../components/FormNotes";

export default function Login() {
	const [username, setUsername] = useState<string>("");

	const navigate: NavigateFunction = useNavigate();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (AccessBll.validateForm(username)) {
			navigate('/home');
		};
	};

	return (
		<div className="bg-black w-screen h-screen flex items-center justify-center">
			<form action="none" onSubmit={handleSubmit} className="bg-darkGrey w-1/3 h-auto flex flex-col items-center justify-center py-4 px-8 rounded-8">
				<h1 className="font-bold text-white text-2xl mb-8">
					QuickChat ⚡
				</h1>
				<div className="flex flex-col w-full justify-center gap-2 mb-12">
					<Input maxLength={15} type="text" placeholder="Nome do usuário" onChange={(e) => setUsername(e.target.value)} />
					<FormNotes />
				</div>
				<Button text="Começar" />
			</form>
		</div>
	)
}