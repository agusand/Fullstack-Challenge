export const saveJWT = (jwt: string) => {
    if (jwt) {
        localStorage.setItem("jwt", jwt);
        return true;
    } else {
        return false;
    }
};

export const getJWT = (): string => {
    return localStorage.getItem("jwt") || "";
};
