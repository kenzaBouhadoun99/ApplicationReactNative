import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FavoritesApp } from "./apps/FavoritesApp";
import { PhoneApp } from "./apps/PhoneApp";
import { PhonesListApp } from "./apps/PhonesListApp";
import { Provider } from "react-redux";
import { Store } from "./Store";
import { RouteNames, RouteTypeList } from "./RouteNames"; // ✅ Import corrigé

export default function Routes() {
  const Stack = createNativeStackNavigator<RouteTypeList>();

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={RouteNames.PhonesList}>
          <Stack.Screen
            name={RouteNames.PhonesList}
            component={PhonesListApp}
            options={{ title: "Liste des téléphones" }}
          />
          <Stack.Screen
            name={RouteNames.Phone}
            component={PhoneApp}
            options={{ title: "Détails du téléphone" }}
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
