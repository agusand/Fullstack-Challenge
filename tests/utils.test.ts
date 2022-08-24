import { validateEmail } from "../src/utils/emailValidator";
import { getJWT, saveJWT } from "../src/utils/authStorageManager";

describe("storageManager", () => {
    test("getJWT", () => {
        localStorage.setItem("jwt", "test");
        expect(getJWT()).toEqual("test");
    });

    test("saveJWT", () => {
        saveJWT("test");
        expect(localStorage.getItem("jwt")).toEqual("test");
    });
});

describe("validator", () => {
    test("emailValidator", () => {
        const rightEmail = "email@email.com";
        const wrongEmail = "email@email";
        expect(validateEmail(rightEmail)).toEqual(true);
        expect(validateEmail(wrongEmail)).toEqual(false);
    });
});
