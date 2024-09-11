import {computed} from "vue";

const key = 'directus-auth-data';

export class LocalStorage {
    get() {
        return JSON.parse(localStorage.getItem(key));
    }

    clear() {
        localStorage.removeItem(key);
    }

    set(data) {
        localStorage.setItem(key, JSON.stringify(data));
    }
}
