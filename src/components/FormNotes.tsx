import { ChevronRight, CircleAlert } from "lucide-react";


export default function FormNotes() {
    return (
        <>
            <div className="flex flex-row items-center gap-2">
                <CircleAlert className="text-orange" size={20} />
                <p className="text-sm text-orange font-medium">Esse nome será exibido para outros usuários na conversa.</p >
            </div>
            <div className="flex flex-row items-center gap-2">
                <ChevronRight className="text-lightGrey" size={20} />
                <p className="text-sm text-lightGrey font-medium">Seu nome deve conter de 1-15 caracteres.</p >
            </div>
        </>
    );
}