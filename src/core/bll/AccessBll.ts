import { AccessController } from "../controllers/AccessController";

export class AccessBll {
    static validateForm(username: string) {
        if (!username) {
            AccessController.validateForm(false);
            return false;
        } 

        if (username.length > 15) {
            AccessController.validateForm(false);
            return false;
        }

        AccessController.validateForm(true);
        return true;
    }
}