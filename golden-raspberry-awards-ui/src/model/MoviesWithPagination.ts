import { MovieWinnerByYear } from "./MovieWinnersByYear";

export interface MoviesWithPagination {
    content: MovieWinnerByYear[];
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: true;
    number: number;
    size: number;
}