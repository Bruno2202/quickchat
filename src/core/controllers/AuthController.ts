import toast from "react-hot-toast"
import { AccessBll } from "../bll/AccessBll";
import { AuthService } from "../services/AuthService";

export class AuthController {
    static validateForm(username: string): boolean {
        if (!AccessBll.validateForm(username)) {
            toast.error("Insira um nome de usuário válido");
            return false;
        }
        return true;
    }

    static async login(id: string, username: string) {
        try {
            const response = await AuthService.login(id, username);

            if (!response.success) {
                toast.error(response.error);
                return response
            }

            return response;
        } catch (error) {
            console.log(`Erro ao realizar login: ${error}`);
            toast.error("Não foi possível realizar login");

            return null
        }
    }
}