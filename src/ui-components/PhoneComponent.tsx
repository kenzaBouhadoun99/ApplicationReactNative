import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Phone } from "../models/Phone";
import { Surface } from "@react-native-material/core";

import { RouteNames, RouteTypeList } from "../RouteNames";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

/**
 * Propriétés du composant affichant un téléphone.
 */
interface PhoneComponentProperties {
  phone: Phone; // Téléphone à afficher
  isInFavorites?: boolean; // Si le téléphone est dans les favoris
  completeInformations?: boolean; // Affichage détaillé ou non
}

/**
 * Composant affichant un téléphone.
 */
export default function PhoneComponent(
  props: Readonly<PhoneComponentProperties>,
) {
  // Navigation entre pages.
  const navigation = useNavigation<NativeStackNavigationProp<RouteTypeList>>();

  return (
    <Surface elevation={4} style={styles.container}>
      <TouchableOpacity
        activeOpacity={props.completeInformations ? 1 : 0.7}
        onPress={() => {
          if (props.completeInformations !== false) {
            navigation.navigate(RouteNames.Phone, {
              phoneId: props.phone.id,
            } as never);
          }
        }}
      >
        {/* Modèle du téléphone */}
        <Text style={styles.title}>{props.phone.model}</Text>

        {/* Informations principales */}
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Constructeur :</Text>
          <Text style={styles.value}>{props.phone.constructor}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Système :</Text>
          <Text style={styles.value}>{props.phone.os}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Prix :</Text>
          <Text style={[styles.value, styles.price]}>
            {props.phone.price} €
          </Text>
        </View>

        {/* Informations sur le vendeur */}
        <View style={styles.salerContainer}>
          <Text style={styles.label}>Vendeur :</Text>
          <Text style={styles.value}>{props.phone.saler}</Text>
          <Text style={styles.salerLocation}>
            ({props.phone.salerCity}, {props.phone.salerCountry})
          </Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          {typeof props.phone.description === "string"
            ? props.phone.description
            : "Aucune description disponible"}
        </Text>

        {/* Date de sortie */}
        <Text style={styles.releaseDate}>
          📅 Sortie : {props.phone.releaseDate}
        </Text>
      </TouchableOpacity>
    </Surface>
  );
}

// Styles du composant
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginRight: 5,
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF",
  },
  salerContainer: {
    marginVertical: 8,
  },
  salerLocation: {
    fontSize: 14,
    color: "#777",
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  releaseDate: {
    marginTop: 10,
    fontSize: 14,
    fontStyle: "italic",
    color: "#666",
  },
});
