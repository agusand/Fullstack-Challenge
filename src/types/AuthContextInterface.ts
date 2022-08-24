import { ClientUser } from "./UserInterface";
import { Error } from "./ErrorInterface";

export interface AuthContextInterface {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: ClientUser;
    error: Error;
    login: (email: string, password: string) => void;
    logout: () => void;
    getUserInfo: (jwt?: string) => void;
}
