import type { Movie } from "../types/movie";

export function loadFromLocalStorage(): Movie[] | undefined {
  try {
    const data: string | null = window.localStorage.getItem("favorites");
    return JSON.parse(data) || [];
  } catch (error) {
    console.error("Error loading favorites", error);
  }
}

export function saveToLocalStorage(data: Movie[]) {
  try {
    window.localStorage.setItem("favorites", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving favorties to local storage", error);
  }
}
