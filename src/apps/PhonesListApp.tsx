import { useNavigation } from "@react-navigation/native";
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { RouteNames, RouteTypeList } from "../RouteNames";

import React, { useState } from "react";
import PhoneComponent from "../ui-components/PhoneComponent";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { IRootState } from "../Store";
import { PhonesList } from "../models/PhonesList";

/**
 * Affiche la liste des téléphones avec une barre de recherche et des filtres.
 */
export function PhonesListApp() {
  const navigation = useNavigation<NativeStackNavigationProp<RouteTypeList>>();

  const [searchQuery, setSearchQuery] = useState("");

  const [minPrice, setMinPrice] = useState<number | string>("");
  const [maxPrice, setMaxPrice] = useState<number | string>("");
  const [minReleaseYear, setMinReleaseYear] = useState<number | string>("");
  const [maxReleaseYear, setMaxReleaseYear] = useState<number | string>("");

  const [showFilters, setShowFilters] = useState(false);

  const favoritesCount: number = useSelector(
    (state: IRootState) => state.favorites.phones.length,
  );

  const allPhones = PhonesList.getInstance().getPhones() || [];

  const filteredPhones = allPhones.filter(
    (phone) =>
      phone.model.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (minPrice ? phone.price >= Number(minPrice) : true) &&
      (maxPrice ? phone.price <= Number(maxPrice) : true) &&
      (minReleaseYear ? phone.releaseDate >= Number(minReleaseYear) : true) &&
      (maxReleaseYear ? phone.releaseDate <= Number(maxReleaseYear) : true),
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Bouton des favoris */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(RouteNames.Favorites)}
        >
          <Text style={styles.buttonText}>
            ❤️ Mes favoris : {favoritesCount}
          </Text>
        </TouchableOpacity>

        {/* Barre de recherche */}
        <TextInput
          style={styles.searchBar}
          placeholder="🔍 Rechercher un téléphone..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Affichage du nombre d'annonces filtrées */}
        <Text style={styles.annoncesText}>
          📢 Nombre d&apos;annonces : {filteredPhones.length}
        </Text>

        {/* Bouton pour afficher/masquer les filtres */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowFilters((prev) => !prev)}
        >
          <Text style={styles.buttonText}>
            {showFilters ? "Masquer les filtres" : "Afficher les filtres"}
          </Text>
        </TouchableOpacity>

        {/* Affichage des filtres si l'état showFilters est vrai */}
        {showFilters && (
          <View>
            <Text style={styles.filterTitle}>Filtres</Text>
            <TextInput
              style={styles.searchBar}
              placeholder="Prix minimum"
              keyboardType="numeric"
              value={minPrice?.toString()}
              onChangeText={(text) => setMinPrice(text)}
            />
            <TextInput
              style={styles.searchBar}
              placeholder="Prix maximum"
              keyboardType="numeric"
              value={maxPrice?.toString()}
              onChangeText={(text) => setMaxPrice(text)}
            />
            <TextInput
              style={styles.searchBar}
              placeholder="Année de sortie minimum"
              keyboardType="numeric"
              value={minReleaseYear?.toString()}
              onChangeText={(text) => setMinReleaseYear(text)}
            />
            <TextInput
              style={styles.searchBar}
              placeholder="Année de sortie maximum"
              keyboardType="numeric"
              value={maxReleaseYear?.toString()}
              onChangeText={(text) => setMaxReleaseYear(text)}
            />
          </View>
        )}
      </View>

      {/* Liste des téléphones filtrés */}
      {filteredPhones.length > 0 ? (
        filteredPhones.map((phone) => (
          <PhoneComponent key={phone.id} phone={phone} />
        ))
      ) : (
        <Text style={styles.noResults}>Aucune annonce trouvée</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
    paddingHorizontal: 20,
  },
  button: {
    width: 180,
    alignSelf: "center",
    marginTop: 18,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  searchBar: {
    width: "90%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  annoncesText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  noResults: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
});
