import type { Movie } from "../types/movie";

export function loadFromLocalStorage(): Movie[] {
  try {
    const data = window.localStorage.getItem("favorites");
    if (data === null) return [];
    return JSON.parse(data) as Movie[];
  } catch (error) {
    console.error("Error loading favorites", error);
    return [];
  }
}

export function saveToLocalStorage(data: Movie[]) {
  try {
    window.localStorage.setItem("favorites", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving favorties to local storage", error);
  }
}
