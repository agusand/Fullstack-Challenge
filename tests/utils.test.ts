import { validateEmail } from "../src/utils/emailValidator";
import { getJWT, saveJWT, clearJWT } from "../src/utils/authStorageManager";

describe("storageManager", () => {
    test("getJWT", () => {
        localStorage.setItem("jwt", JSON.stringify({ token: "test" }));
        expect(getJWT()).toEqual("test");
        localStorage.removeItem("jwt");
    });

    test("saveJWT", () => {
        saveJWT("test");
        expect(
            JSON.parse(localStorage.getItem("jwt") as string)?.token
        ).toEqual("test");
        localStorage.removeItem("jwt");
    });

    test("clearJWT", () => {
        localStorage.setItem("jwt", "test");
        clearJWT();
        expect(localStorage.getItem("jwt")).toEqual(null);
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
