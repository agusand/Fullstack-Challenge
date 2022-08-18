export function saveJWT(jwt: string) {
    if (jwt) {
        localStorage.setItem("jwt", jwt);
        return true;
    } else {
        return false;
    }
}

export function getJWT(): string {
    return localStorage.getItem("jwt") || "";
}
