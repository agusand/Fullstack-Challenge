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
