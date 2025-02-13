export class AuthBll {
    static validateForm(username: string): boolean {
        if (username.length < 1 || username.length > 15) {
            return false;
        }

        return true;
    }
}