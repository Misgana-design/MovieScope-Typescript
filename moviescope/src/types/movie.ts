export interface Movie {
  id: number;
  title: string | undefined;
  overview?: string | null;
  backdrop_path?: string | null;
  vote_average?: number;
  vote_count?: number;
  release_date?: string;
  popularity: number;
  poster_path: string | undefined;
}

export interface MovieResponse {
  page: number;
  results: Array<Movie>;
  total_pages: number;
  total_results: number;
}

