export interface Movie {
  id: number;
  title: string;
  overview?: string;
  backdrop_path?: string;
  vote_average?: number;
  vote_count?: number;
  release_date?: string;
  popularity: number;
  poster_path: string;
}

export interface MovieResponse {
  page: number;
  results: Array<Movie>;
  total_pages: number;
  total_results: number;
}
