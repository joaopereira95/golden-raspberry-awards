import axios from 'axios';

import { MultipleWinners } from '../model/MultipleWinners';
import { LongestShortestIntervalWinners } from '../model/LongestShortestIntervalWinners';
import { StudiosWithWinCount } from '../model/StudiosWithWinCount';
import { MovieWinnerByYear } from '../model/MovieWinnersByYear';
import { MoviesWithPagination } from '../model/MoviesWithPagination';

const baseUrl = 'https://tools.texoit.com/backend-java/api/movies';

const multipleWinnersProjections = '?projection=years-with-multiple-winners';
const maxMinWinIntervalForProducers = '?projection=max-min-win-interval-for-producers';
const studiosWithWinCount = '?projection=studios-with-win-count';
const movieWinnersByYear = '?winner=true&year=';

export interface MovieSearchFilters {
    year?: number | null;
    winner?: boolean;
    page: number;
    rows: number;
}

/**
 * It finds the years with multiple years
 * @returns years with multiple winners
 */
export async function getMultipleWinners(): Promise<MultipleWinners> {
    try {
        const response = await axios.get<MultipleWinners>(`${baseUrl}${multipleWinnersProjections}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error finding multiple winners: ${error}`);
    }
}

/**
 * It finds the min and max interval winners
 * @returns min and max interval winners
 */
export async function getMaxMinInterval(): Promise<LongestShortestIntervalWinners> {
    try {
        const response = await axios.get<LongestShortestIntervalWinners>(`${baseUrl}${maxMinWinIntervalForProducers}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error finding max/min interval winners: ${error}`);
    }
}

/**
 * It finds the studios and win count
 * @returns studios and win count
 */
export async function getStudiosWithWinCount(): Promise<StudiosWithWinCount> {
    try {
        const response = await axios.get<StudiosWithWinCount>(`${baseUrl}${studiosWithWinCount}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error finding studios with win count: ${error}`);
    }
}

/**
 * It finds movie winners by year
 * @param year 
 * @returns list of movie winners by year
 */
export async function findMovieWinnersByYear(year: number): Promise<MovieWinnerByYear[]> {
    try {
        const response = await axios.get<MovieWinnerByYear[]>(`${baseUrl}${movieWinnersByYear}${year}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error finding movie winners by year: ${error}`);
    }
}

/**
 * It finds movie by filters
 * @param filters 
 * @returns movie by filters
 */
export async function findMoviesByFilters(filters?: MovieSearchFilters): Promise<MoviesWithPagination> {

    let params = '';

    if (!filters) {
        params = '?page=0&size=10'; // default params
    } else {
        params = `?page=${filters.page}&size=${filters.rows}`; 

        if (filters.winner !== undefined) {
            params += `&winner=${filters.winner}`;
        }

        if (filters.year) {
            params += `&year=${filters.year}`;
        }
    }

    try {
        const response = await axios.get<MoviesWithPagination>(`${baseUrl}${params}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error finding movies: ${error}`);
    }
}