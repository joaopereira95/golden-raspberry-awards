import { MovieWinnerByYear } from "./MovieWinnersByYear";

export interface MoviesWithPagination {
  content: MovieWinnerByYear[];
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  number: number;
  size: number;
}
