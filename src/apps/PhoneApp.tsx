import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import PhoneComponent from "../ui-components/PhoneComponent";
import { Phone } from "../models/Phone";
import { View, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button } from "@react-native-material/core";
import { useDispatch, useSelector } from "react-redux";
import { addPhone, delPhone, IRootState } from "../Store";
import { PhonesList } from "../models/PhonesList";
import { RouteProp } from "@react-navigation/native";
import { RouteNames, RouteTypeList } from "../RouteNames";

/**
 * Propriétés de la page d'un telephone.
 */
interface PhoneAppProperties {
  // Paramètres reçus pour la page.
  route: RouteProp<RouteTypeList, "Phone">;
}

/**
 * Affichage des informations complètes d'un film.
 */
export function PhoneApp(props: Readonly<PhoneAppProperties>) {
  // Film à afficher.
  const [phone, setPhone] = useState<Phone | undefined>({} as Phone);
  // Navigation entre pages.
  const navigation = useNavigation<NativeStackNavigationProp<RouteTypeList>>();

  // Connexion au store.
  const dispatch = useDispatch();

  // Récupération des films favoris.
  const favorites: Phone[] = useSelector(
    (state: IRootState) => state.favorites.phones,
  );

  // Indicateur si le film est dans les favoris.
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // Chargement initial du film à afficher.
  useEffect(() => {
    // Récupération de l'id du film depuis les paramètres.
    const id = props.route.params.phoneId;

    // Sauvegarde du film correspondant dans l'état.
    setPhone(
      PhonesList.getInstance()
        .getPhones()
        .find((phone) => phone.id === id),
    );
  }, []);

  // Vérification si le film est dans les favoris.
  useEffect(() => {
    setIsFavorite(
      favorites.find((favorite) => favorite.id === phone?.id) != null,
    );
  }, [favorites, phone]);

  return (
    <View>
      {phone && ( // Si le phone est chargé, on l'affiche.
        <PhoneComponent phone={phone} completeInformations={true} />
      )}
      <Button
        title={isFavorite ? "Supprimer des favoris" : "Ajouter au favoris"}
        style={styles.button}
        color={isFavorite ? "red" : "green"}
        onPress={() => dispatch(isFavorite ? delPhone(phone) : addPhone(phone))}
      />
      <Button
        title={"Retour"}
        style={styles.button}
        color={"green"}
        onPress={() => navigation.navigate(RouteNames.PhonesList)}
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
