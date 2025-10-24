import type {UserLogin, UserRegister} from "../types/auth.ts";
import {storageService} from "./storage.service.ts";
import {STORAGE_KEY} from "../utils/constants.ts";

export const authService = {
    register: (user: UserRegister) => {

        const users = storageService.get(STORAGE_KEY.AUTH);
        const id = Date.now().toString();

        if (users){

            if (users.find((u: UserRegister) => u.email === user.email)) {
                throw new Error('User already exists!');
            }
            storageService.set(STORAGE_KEY.AUTH, [...users, {...user, id: id}]);

        } else {
            storageService.set(STORAGE_KEY.AUTH, [{...user, id: id}])
        }

        storageService.set(STORAGE_KEY.CURRENT_SESSION, id);

        return {...user, id: id};
    },

    login: (user: UserLogin) => {

        const users = storageService.get(STORAGE_KEY.AUTH);

        if (!users) {
            throw new Error('User not found!');
        }

        const currUser = users.find((u: UserRegister) => u.username === user.username && u.password === user.password);
        if (!currUser) {
            throw new Error('User not found!');
        }

        storageService.set(STORAGE_KEY.CURRENT_SESSION, currUser.id);
        return currUser;
    },

    logout: () => {
        storageService.remove(STORAGE_KEY.CURRENT_SESSION);
    }

}