class LocalStorageMock {
    store: any;
    length: number;
    key: (index: number) => string | null;

    constructor() {
        this.store = {};
        this.length = 0;
        this.key = (index: number) => {
            const keys = Object.keys(this.store);
            return keys[index] || null;
        };
    }

    clear() {
        this.store = {};
        this.length = 0;
    }

    getItem(key: string) {
        return this.store[key] || null;
    }

    setItem(key: string, value: string) {
        if (!this.store[key]) {
            this.length++;
        }
        this.store[key] = String(value);
    }

    removeItem(key: string) {
        if (this.store[key]) {
            delete this.store[key];
            this.length--;
        }
    }
}

global.localStorage = new LocalStorageMock();

export {};
