

class Storage {
    getItem(key: string) {
        // @ts-ignore
        return JSON.parse(localStorage.getItem(key));
    }

    setItem(key: string, item: string) {
        localStorage.setItem(key, JSON.stringify(item));
    }
}

export const storage = new Storage();
