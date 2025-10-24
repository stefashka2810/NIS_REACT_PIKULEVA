export interface Movie {
    id: number;
    title: string;
    genre: string;
    year: number;
    description: string;
    posterUrl: string;
    isFavorite: boolean;
    url?: string;
}