export const saveJWT = (jwt: string) => {
    if (jwt) {
        const stringJwt = JSON.stringify(jwt);
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
