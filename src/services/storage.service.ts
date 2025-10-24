import type {UserRegister} from "../types/auth.ts";
import type {Movie} from "../types/movie.ts";

export const storageService = {
    set: (key: string, value: UserRegister[] | number[] | string | Movie[]) => {
        localStorage.setItem(key, JSON.stringify(value));
    },

    get: (key:string) => {
        const item = localStorage.getItem(key);
        if (!item || item === '[]') {
            return  null;
        }
        return JSON.parse(item);
    },

    remove: (key:string) => {
        localStorage.removeItem(key);
    }
}