import { useReducer, useEffect } from "react";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../hook/useLocalStorage.ts";

function reducer(state, action) {
  switch (action.type) {
    case "ADD_FAVORITES":
      if (state.some((s) => s.id === action.payload.id)) {
        return state;
      }
      [...state, action.payload];
    case "REMOVE_FAVORITES":
      state.filter((s) => s.id !== action.payload.id);
    default:
      state;
  }
}

const { state, dispatch } = useReducer(reducer, () => {
  const state = loadFromLocalStorage();
  return state ?? [];
});

useEffect(() => {
  saveToLocalStorage(state);
}, [state]);

function addFavorites(item) {
  dispatch({ type: "ADD_FAVORITES", payload: item });
}

function removeFavorites(item) {
  dispatch({ type: "REMOVE_FAVORITES", payload: item });
}

function isFavorite(item) {
  return state.some((fav) => fav.id === item.id);
}
