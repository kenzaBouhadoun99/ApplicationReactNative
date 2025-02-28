import { useNavigation } from "@react-navigation/native";
import { Text, ScrollView, StyleSheet } from "react-native";
import { RouteNames, RouteTypeList } from "../Routes";
import React from "react";
import MovieComponent from "../ui-components/MovieComponent";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button } from "@react-native-material/core";
import { useSelector } from "react-redux";
import { IRootState } from "../Store";
import { MoviesList } from "../models/MoviesList";

/**
 * Affiche la liste des films.
 */
export function MoviesListApp() {
  // Navigation entre pages.
  const navigation = useNavigation<NativeStackNavigationProp<RouteTypeList>>();

  // Récupère le nombre de films favoris.
  const favoritesCount: number = useSelector(
    (state: IRootState) => state.favorites.movies.length,
  );

  return (
    <ScrollView>
      <Button
        title={`❤️ Mes favoris : ${favoritesCount}`}
        style={styles.button}
        uppercase={false}
        color="green"
        onPress={() => navigation.navigate(RouteNames.Favorites)}
      />
      {MoviesList.getInstance().getMovies() ? ( // Affiche les films si disponibles.
        MoviesList.getInstance()
          .getMovies()
          .map((movie) => (
            // Affiche chaque film de la liste.
            <MovieComponent key={movie.id} movie={movie} />
          ))
      ) : (
        // Affiche un message de chargement si les films ne sont pas encore disponibles.
        <Text>Chargement...</Text>
      )}
    </ScrollView>
  );
}

// Style de la page.
const styles = StyleSheet.create({
  button: {
    width: 180,
    alignSelf: "center",
    marginTop: 18,
    marginBottom: 10,
    borderRadius: 5,
  },
});
