import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MovieComponent from "../ui-components/MovieComponent";
import { Movie } from "../models/Movie";
import { View, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button } from "@react-native-material/core";
import { useDispatch, useSelector } from "react-redux";
import { addMovie, delMovie, IRootState } from "../Store";
import { MoviesList } from "../models/MoviesList";
import { RouteProp } from "@react-navigation/native";
import { RouteTypeList , RouteNames} from "../Routes";

/**
 * Propriétés de la page d'un film.
 */
interface MovieAppProperties {
  // Paramètres reçus pour la page.
  route: RouteProp<RouteTypeList, "Movie">;
}

/**
 * Affichage des informations complètes d'un film.
 */
export function MovieApp(props: Readonly<MovieAppProperties>) {
  // Film à afficher.
  const [movie, setMovie] = useState<Movie | undefined>({} as Movie);
  // Navigation entre pages.
  const navigation = useNavigation<NativeStackNavigationProp<RouteTypeList>>();

  // Connexion au store.
  const dispatch = useDispatch();

  // Récupération des films favoris.
  const favorites: Movie[] = useSelector(
    (state: IRootState) => state.favorites.movies,
  );

  // Indicateur si le film est dans les favoris.
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // Chargement initial du film à afficher.
  useEffect(() => {
    // Récupération de l'id du film depuis les paramètres.
    const id = props.route.params.movieId;

    // Sauvegarde du film correspondant dans l'état.
    setMovie(
      MoviesList.getInstance()
        .getMovies()
        .find((movie) => movie.id === id),
    );
  }, []);

  // Vérification si le film est dans les favoris.
  useEffect(() => {
    setIsFavorite(
      favorites.find((favorite) => favorite.id === movie?.id) != null,
    );
  }, [favorites, movie]);

  return (
    <View>
      {movie && ( // Si le film est chargé, on l'affiche.
        <MovieComponent movie={movie} completeInformations />
      )}
      <Button
        title={isFavorite ? "Supprimer des favoris" : "Ajouter au favoris"}
        style={styles.button}
        color={isFavorite ? "red" : "green"}
        onPress={() => dispatch(isFavorite ? delMovie(movie) : addMovie(movie))}
      />
      <Button
        title={"Retour"}
        style={styles.button}
        color={"green"}
        onPress={() => navigation.navigate(RouteNames.MoviesList)}
      />
    </View>
  );
}

// Style de la page.
const styles = StyleSheet.create({
  button: {
    width: 300,
    alignSelf: "center",
    margin: 10,
  },
});
