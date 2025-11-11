export interface Movie {
  id: number;
  title: string | null;
  overview?: string | null;
  backdrop_path?: string | null;
  vote_average?: number;
  vote_count?: number;
  release_date?: string;
  popularity: number;
  poster_path: string | null;
}

export interface MovieResponse {
  page: number;
  results: Array<Movie[]>;
  total_pages: number;
  total_results: number;
}
