export const validateEmail = (email: string) => {
    const matchRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return matchRegex.test(email);
};
