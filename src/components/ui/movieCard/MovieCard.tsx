import type {Movie} from "../../../types/movie.ts";
import styles from './MovieCard.module.css'
import Button from "../button/Button.tsx";
import { Star } from 'lucide-react';

interface MovieCardProps {
    movie: Movie;
    onToggleFavorite: (movieId: number) => void;
    mode: 'список' | 'плитка';
}
export const MovieCard = ({movie, onToggleFavorite, mode }: MovieCardProps) => {
    const handleFavClick = () => {
        onToggleFavorite(movie.id);
    }

    const handleWatchDetails = () => {
        window.open(movie.url, '_blank');
    }

    return (
        <>
            <article className={mode==='список' ? styles.movieCard : styles.movieCardPanel}>
                <img src={movie.posterUrl} alt={movie.title} width="150px" height="190px" />
                <div className={styles.infoBlock}>
                    <div className={styles.titleBlock}>
                        <span>{movie.title.toUpperCase()}</span>
                        <button onClick={handleFavClick} className={styles.buttonStar}>
                            <Star fill={movie.isFavorite ? '#F5C61C': 'transparent'} color='#F5C61C'/>
                        </button>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.addInfoBlock}>{movie.genre}</div>
                        <div className={styles.addInfoBlock}>{movie.year}</div>
                    </div>
                    <p>{mode==='список' ? movie.description : movie.description.slice(0,50) + '...'}</p>
                    <Button text="ПОСМОТРЕТЬ ДЕТАЛИ" color='#F5C61C' onClick={handleWatchDetails}/>
                </div>
            </article>
        </>
    )
}