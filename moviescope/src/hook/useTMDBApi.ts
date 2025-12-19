import axios from "axios";
import type { Movie } from "../types/movie";

export const api_key = import.meta.env.VITE_TMDB_API_KEY;
export const api_url = import.meta.env.VITE_TMDB_BASE_URL;
export const image_base_url = import.meta.env.IMAGE_BASE_URL;
export const original_image_base_url = import.meta.env
  .VITE_ORIGINAL_IMAGE_BASE_URL;

export async function searchMovies(query: string): Promise<Movie[]> {
  try {
    const res = await axios.get(
      `${api_url}/search/movie?api_key=${api_key}&query=${encodeURIComponent(
        query
      )}`
    );
    return res.data.results;
  } catch (error) {
    console.error("Error occured", error);
  }
}

export async function fetchTrending(): Promise<Movie[]> {
  try {
    const res = await axios.get(
      `${api_url}/trending/movie/week?api_key=${api_key}`
    );
    return res.data.results || [];
  } catch (error) {
    console.error("Error occured", error);
    throw error;
  }
}

export async function fetchTrendingTvSeries(): Promise<Movie[]> {
  try {
    const res = await axios.get(
      `${api_url}/trending/tv/week?api_key=${api_key}`
    );
    return res.data.results || [];
  } catch (error) {
    console.log("Error occured", error);
    throw error;
  }
}

// export async function logo() {
//   const data = fetchTrending();
//   return (await data).map((movie) => {
//     console.log(movie[0]);
//     axios.get(`${api_url}/movies/${movie.id}/images?api_key=${api_key}`);
//   });
// }
