import toast from "react-hot-toast"

export class AccessController {
    static validateForm(status: boolean) {
        if (!status) {
            toast.error("Insira um nome de usuário válido");
        }
    }
}