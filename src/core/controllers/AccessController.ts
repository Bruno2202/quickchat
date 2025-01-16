import toast from "react-hot-toast"
import { AccessBll } from "../bll/AccessBll";

export class AccessController {
    static validateForm(username: string): boolean {
        if (!AccessBll.validateForm(username)) {
            toast.error("Insira um nome de usuário válido");

            return false;
        }

        return true;
    }
}