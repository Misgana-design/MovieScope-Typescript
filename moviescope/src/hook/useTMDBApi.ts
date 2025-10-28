import axios from "axios";
const api_key: string = import.meta.env.VITE_TMDB_API_KEY;
const api_url: string = import.meta.env.VITE_TMDB_BASE_URL;
const image_base_url = import.meta.env.IMAGE_BASE_URL;
const original_image_base_url = import.meta.env.ORIGINAL_IMAGE_BASE_URL;

export async function searchMovies() {
  try {
    const res = await axios.get(
      `${api_url}/trending/movie/week?api_key=${api_key}`
    );
    return res.data.result || [];
  } catch (error) {
    console.error("Error occured", error);
    throw error;
  }
}
