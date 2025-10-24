import type {Movie} from "../types/movie.ts";
import {storageService} from "./storage.service.ts";
import {STORAGE_KEY} from "../utils/constants.ts";

export const favService = {
    setFav: ( movie: Movie)=> {
        const id = storageService.get(STORAGE_KEY.CURRENT_SESSION);
        const key = `${STORAGE_KEY.FAVORITES_PREFIX}${id}`;
        const movies = storageService.get(key);
        
        if (!movies){
            storageService.set(key, [movie]);
        } else {
            const alreadyExists = movies.some((mov: Movie) => mov.id === movie.id);
            if (!alreadyExists) {
                storageService.set(key, [...movies, movie]);
            }
        }
    },

    getFav: ()=> {
        const id = storageService.get(STORAGE_KEY.CURRENT_SESSION);
        const key = `${STORAGE_KEY.FAVORITES_PREFIX}${id}`;
        const movies = storageService.get(key);
        if (!movies){
            return [];
        } else {
            return movies;
        }
    },

    removeFav: (movie: Movie) => {
        const id = storageService.get(STORAGE_KEY.CURRENT_SESSION);
        const key = `${STORAGE_KEY.FAVORITES_PREFIX}${id}`;
        const movies = storageService.get(key);
        if (movies){
            const filteredMovies = movies.filter((mov: Movie) => mov.id !== movie.id);
            storageService.set(key, filteredMovies);
        }
    },

    isFavorite: (movieId: number): boolean => {
        const id = storageService.get(STORAGE_KEY.CURRENT_SESSION);
        const key = `${STORAGE_KEY.FAVORITES_PREFIX}${id}`;
        const movies = storageService.get(key);
        if (!movies) return false;
        return movies.some((mov: Movie) => mov.id === movieId);
    }
}