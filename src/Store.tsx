import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Movie } from "./models/Movie";

// Gestion des favoris.
const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    movies: [] as Movie[],
  },
  reducers: {
    addMovie: (state, action) => {
      state.movies.push(action.payload); // Ajouter un film aux favoris.
    },
    delMovie: (state, action) => {
      state.movies = state.movies.filter(
        (movie) => movie.id != action.payload.id, // Supprimer un film des favoris.
      );
    },
  },
});

// Export des actions pour les favoris.
export const { addMovie, delMovie } = favoritesSlice.actions;

// Configuration du store Redux.
export const Store = configureStore({
  reducer: {
    favorites: favoritesSlice.reducer,
  },
});

// Export du type de l'état du store.
export type IRootState = ReturnType<typeof Store.getState>;
