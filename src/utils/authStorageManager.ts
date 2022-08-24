export const saveJWT = (jwt: string) => {
    if (jwt) {
        const stringJwt = JSON.stringify({ token: jwt });
        localStorage.setItem("jwt", stringJwt);
        return true;
    } else {
        return false;
    }
};

export const getJWT = (): string => {
    const unparsedJwt = localStorage.getItem("jwt") || "";
    return JSON.parse(unparsedJwt)?.token || "";
};

export const clearJWT = (): void => {
    localStorage.removeItem("jwt");
};
