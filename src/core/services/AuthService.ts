import api from "../../config/apiConfig";

export interface AuthResponse {
    success: boolean;
    code: number;
    message: string;
    error: string;
    token: string;
}

export class AuthService {
    static async login(id: string, username: string): Promise<AuthResponse> {
        try {
            const response = await api.post<AuthResponse>(`/auth/login`, {
                id,
                username
            });

            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error("Erro desconhecido");
            }
        }
    }
}