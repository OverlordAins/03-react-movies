import axios from 'axios';
import { type Movie } from '../types/movie';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface TMDBResponse {
  results: Movie[];
}

export interface FetchMoviesParams {
  query: string;
  page?: number;
}

export const fetchMovies = async ({
  query,
  page = 1,
}: FetchMoviesParams): Promise<Movie[]> => {
  if (!TMDB_TOKEN) {
    throw new Error(
      'TMDB Token is not set. Please check VITE_TMDB_TOKEN in your .env file.'
    );
  }

  const response = await axios.get<TMDBResponse>(
    `${TMDB_BASE_URL}/search/movie`,
    {
      params: { query, page },
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
        accept: 'application/json',
      },
    }
  );

  return response.data?.results ?? [];
};

export const getFullImageUrl = (
  path: string | null | undefined,
  size: 'w500' | 'original' = 'w500'
): string => {
  if (!path) {
    return 'https://via.placeholder.com/500x750?text=No+Image';
  }
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
