import type {Movie} from '../../types/movie.ts'
import {Movies} from "../../data/data.ts";
import {MovieCard} from "../../components/ui/movieCard/MovieCard.tsx";
import styles from './CatalogPage.module.css'
import Filter from "../../components/ui/filter/Filter.tsx";
import {useState, useEffect} from "react";
import Toggle from "../../components/ui/toggle/Toggle.tsx";
import SearchField from "../../components/ui/search/SearchField.tsx";
import Layout from '../Layout.tsx'
import {favService} from "../../services/fav.service.ts";

const CatalogPage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [filter, setFilter] = useState<'все' | 'любимые'>('все');
    const [mode, setMode] = useState<'список' | 'плитка'>('список');
    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        const favoriteMovies = favService.getFav();
        const favoriteIds = favoriteMovies.map((movie: Movie) => movie.id);
        
        const moviesWithFavorites = Movies.map(movie => ({
            ...movie,
            isFavorite: favoriteIds.includes(movie.id)
        }));
        
        setMovies(moviesWithFavorites);
    }, []);

    const handleFilter = (currFilter: 'все' | 'любимые') => {
        setFilter(currFilter);
    }

    const handleMode = (mode: 'список' | 'плитка') => {
        setMode(mode);
    }

    const handleSaveSearchValue = (searchText: string) => {
        setSearchText(searchText);
    }

    const handleToggleFavorite = (movieId: number) => {
        setMovies(prevMovies =>
            prevMovies.map(movie => {
                if (movie.id === movieId) {
                    const newFavoriteState = !movie.isFavorite;
                    
                    if (newFavoriteState) {
                        favService.setFav(movie);
                    } else {
                        favService.removeFav(movie);
                    }
                    
                    return { ...movie, isFavorite: newFavoriteState };
                }
                return movie;
            })
        );
    }

    const filteredMovies = filter==='любимые' ? movies.filter(movie => movie.isFavorite) : movies;
    const searchedMovies = searchText.length > 0 ? filteredMovies.filter(movie =>
        movie.title.toLowerCase().startsWith(searchText.toLowerCase())
    ) : filteredMovies;


    return (
        <Layout>
            <section className={styles.moviesBlock}>

                <div className={styles.featureBlock}>
                    <Filter handleFilter={handleFilter}/>
                    <SearchField onSaveSearchValue={handleSaveSearchValue}/>
                    <Toggle onModeClick={handleMode}/>
                </div>
                <div className={mode==='список' ? styles.list : styles.panel}>
                    {searchedMovies.length > 0 && searchedMovies.map((movie: Movie) => {
                        return(
                            <div  key={movie.id} className={styles.movieBlock}>
                                <MovieCard movie={movie} onToggleFavorite={handleToggleFavorite} mode={mode}/>
                            </div>)
                    })}

                    {searchedMovies.length === 0 &&
                        <div className={styles.featureBlock}>
                        таких фильмов нет
                    </div>}
                </div>
            </section>
        </Layout>
    )
}

export default CatalogPage;