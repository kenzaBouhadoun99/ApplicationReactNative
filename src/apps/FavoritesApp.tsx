import React from "react";
import { View } from "react-native";
import { Movie } from "../models/Movie";
import { useSelector } from "react-redux";
import MovieComponent from "../ui-components/MovieComponent";
import { IRootState } from "../Store";

/**
 * Affiche les films favoris.
 */
export function FavoritesApp() {
  // Obtient la liste des films favoris.
  const favorites: Movie[] = useSelector(
    (state: IRootState) => state.favorites.movies,
  );

  return (
    <View>
      {favorites?.map((movie) => (
        <MovieComponent key={movie.id} movie={movie} />
      ))}
    </View>
  );
}
