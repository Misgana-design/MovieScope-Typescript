import { useReducer, useEffect, createContext, useContext } from "react";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../hook/useLocalStorage.ts";
import type { Movie } from "../types/movie.ts";
import type { ReactNode } from "react";

type FavoritesAction =
  | { type: "ADD_FAVORITES"; payload: Movie }
  | { type: "REMOVE_FAVORITES"; payload: Movie };

function reducer(state: Movie[], action: FavoritesAction): Movie[] {
  switch (action.type) {
    case "ADD_FAVORITES":
      if (state.some((s) => s.id === action.payload.id)) {
        return state;
      }
      return [...state, action.payload];
    case "REMOVE_FAVORITES":
      return state.filter((s) => s.id !== action.payload.id);
    default:
      return state;
  }
}

interface FavoritesValueType {
  addFavorites: (item: Movie) => void;
  removeFavorites: (item: Movie) => void;
  isFavorite: (item: Movie) => boolean;
  state: Movie[];
}

interface Child {
  children: ReactNode;
}

export const FavoritesContext = createContext<FavoritesValueType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: Child) {
  const [state, dispatch] = useReducer(reducer, undefined, () => {
    const state = loadFromLocalStorage();
    return state ?? [];
  });

  useEffect(() => {
    saveToLocalStorage(state);
  }, [state]);

  function addFavorites(item: Movie) {
    dispatch({ type: "ADD_FAVORITES", payload: item });
  }

  function removeFavorites(item: Movie): void {
    dispatch({ type: "REMOVE_FAVORITES", payload: item });
  }

  function isFavorite(item: Movie): boolean {
    return state.some((fav) => fav.id === item.id);
  }

  const values: FavoritesValueType | undefined = {
    addFavorites,
    removeFavorites,
    isFavorite,
    state,
  };

  return (
    <FavoritesContext.Provider value={values}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const values = useContext(FavoritesContext);
  if (!values) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return values;
}
