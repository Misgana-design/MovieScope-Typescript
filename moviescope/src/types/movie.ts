export interface Movie {
  id: number;
  title: number;
  overview: string;
  backdrop_path: number;
  vote_average?: number;
  vote_count?: number;
  release_date?: number;
  popularity: number;
  poster_path: number;
}

export interface MovieResponse {
  page: number;
  results: Array<Movie>;
  total_pages: number;
  total_results: number;
}
