import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Phone } from "./models/Phone";

// Gestion des favoris.
const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    phones: [] as Phone[],
  },
  reducers: {
    addPhone: (state, action) => {
      state.phones.push(action.payload); // Ajouter un film aux favoris.
    },
    delPhone: (state, action) => {
      state.phones = state.phones.filter(
        (phone) => phone.id != action.payload.id, // Supprimer un film des favoris.
      );
    },
  },
});

// Export des actions pour les favoris.
export const { addPhone, delPhone } = favoritesSlice.actions;

// Configuration du store Redux.
export const Store = configureStore({
  reducer: {
    favorites: favoritesSlice.reducer,
  },
});

// Export du type de l'état du store.
export type IRootState = ReturnType<typeof Store.getState>;
