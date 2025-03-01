import { Phone } from "./Phone";

/**
 * Classe gérant la liste des films.
 */
export class PhonesList {
  // Instance unique de la classe (singleton).
  private static phonesListInstance: PhonesList | null = null;

  // Liste des films.
  protected phones: Phone[];

  constructor() {
    // Charger les données des fichiers JSON.
    //const jsonData1 = require("../../assets/PopularMovies_p1.json");
    //const jsonData2 = require("../../assets/PopularMovies_p2.json");
    const jsonData1 = require("../../assets/phone.json");
    // Initialiser la liste des films.
    this.phones = jsonData1;
  }

  // Retourner l'instance unique de la classe.
  static getInstance(): PhonesList {
    if (PhonesList.phonesListInstance == null) {
      PhonesList.phonesListInstance = new PhonesList();
    }
    return PhonesList.phonesListInstance;
  }

  // Obtenir la liste des films.
  public getPhones(): Phone[] {
    return this.phones;
  }
}
