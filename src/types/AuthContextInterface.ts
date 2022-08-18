import { ServerUser } from "./UserInterface";
import { Error } from "./ErrorInterface";

export interface AuthContextInterface {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: ServerUser;
    error: Error;
    login: (email: string, password: string) => void;
    logout: () => void;
}
