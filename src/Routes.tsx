import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FavoritesApp } from "./apps/FavoritesApp";
import { MovieApp } from "./apps/MovieApp";
import { MoviesListApp } from "./apps/MoviesListApp";
import { Provider } from "react-redux";
import { Store } from "./Store";

// Types des routes disponibles dans l'application.
export type RouteTypeList = {
  MoviesList: undefined;
  Movie: { movieId: string };
  Favorites: undefined;
};

/**
 * Liste des noms des routes.
 */
export enum RouteNames {
  MoviesList = "MoviesList",
  Movie = "Movie",
  Favorites = "Favorites",
}

/**
 * Définir et gérer la navigation entre les écrans de l'application.
 */
export default function Routes() {
  const Stack = createNativeStackNavigator<RouteTypeList>();

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={RouteNames.MoviesList}>
          <Stack.Screen
            name={RouteNames.MoviesList}
            component={MoviesListApp}
            options={{ title: "Liste des films" }}
          />
          <Stack.Screen
            name={RouteNames.Movie}
            component={MovieApp}
            options={{ title: "Film" }}
          />
          <Stack.Screen
            name={RouteNames.Favorites}
            component={FavoritesApp}
            options={{ title: "Favoris" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
