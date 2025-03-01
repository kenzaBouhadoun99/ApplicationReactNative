import React from "react";
import { ScrollView, View } from "react-native";
import { Phone } from "../models/Phone";
import { useSelector } from "react-redux";
import PhoneComponent from "../ui-components/PhoneComponent";
import { IRootState } from "../Store";

/**
 * Affiche les films favoris.
 */
export function FavoritesApp() {
  // Obtient la liste des films favoris.
  const favorites: Phone[] = useSelector(
    (state: IRootState) => state.favorites.phones,
  );

  return (
    <ScrollView>
      {" "}
      {/* Ajout du ScrollView ici */}
      <View>
        {favorites?.map((phone) => (
          <PhoneComponent key={phone.id} phone={phone} />
        ))}
      </View>
    </ScrollView>
  );
}
