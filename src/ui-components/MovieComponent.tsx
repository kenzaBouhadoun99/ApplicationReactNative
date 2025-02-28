import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Movie } from "../models/Movie";
import { Surface } from "@react-native-material/core";
import { RouteNames, RouteTypeList } from "../Routes";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

/**
 * Propriétés du composant affichant un film.
 */
interface MovieComponentProperties {
  // Film à afficher.
  movie: Movie;
  // Si le film est dans les favoris.
  isInFavorites?: boolean;
  // Affiche les informations complètes.
  completeInformations?: boolean;
}

/**
 * Composant affichant un film.
 */
export default function MovieComponent(
  props: Readonly<MovieComponentProperties>,
) {
  // Navigation entre pages.
  const navigation = useNavigation<NativeStackNavigationProp<RouteTypeList>>();

  return (
    <Surface elevation={3} style={styles.container}>
      <TouchableOpacity
        activeOpacity={props.completeInformations ? 1 : 0.5}
        onPress={() => {
          if (props.completeInformations !== false)
            navigation.navigate(RouteNames.Movie, {
              movieId: props.movie.id,
            } as never);
        }}
      >
        <Text style={styles.titre}>{props.movie.title}</Text>

        {props?.completeInformations && (
          <View>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Note :</Text>
              <Text>{props.movie.vote_average}</Text>
            </View>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`,
              }}
              style={styles.poster}
            />
          </View>
        )}

        <Text style={styles.date_realisation}>{props.movie.release_date}</Text>
        <Text>{props.movie.overview}</Text>
      </TouchableOpacity>
    </Surface>
  );
}

// Style du composant.
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
  },
  titre: {
    fontSize: 20,
    fontWeight: "bold",
  },
  poster: {
    width: 200,
    height: 300,
    alignSelf: "center",
    marginBottom: 5,
  },
  date_realisation: {
    fontStyle: "italic",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    gap: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
