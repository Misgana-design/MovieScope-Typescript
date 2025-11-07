import axios from "axios";
import type { MovieResponse } from "../types/movie";

const api_key = import.meta.env.VITE_TMDB_API_KEY;
const api_url = import.meta.env.VITE_TMDB_BASE_URL;
export const image_base_url = import.meta.env.IMAGE_BASE_URL;
export const original_image_base_url = import.meta.env
  .VITE_ORIGINAL_IMAGE_BASE_URL;

export async function searchMovies(): Promise<MovieResponse> {
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
