import { Movie } from "./Movie";

/**
 * Classe gérant la liste des films.
 */
export class MoviesList {
  // Instance unique de la classe (singleton).
  private static moviesListInstance: MoviesList | null = null;

  // Liste des films.
  protected movies: Movie[];

  constructor() {
    // Charger les données des fichiers JSON.
    const jsonData1 = require("../../assets/PopularMovies_p1.json");
    const jsonData2 = require("../../assets/PopularMovies_p2.json");
    
    // Initialiser la liste des films.
    this.movies = [...jsonData1["results"], ...jsonData2["results"]];
  }

  // Retourner l'instance unique de la classe.
  static getInstance(): MoviesList {
    if (MoviesList.moviesListInstance == null) {
      MoviesList.moviesListInstance = new MoviesList();
    }
    return MoviesList.moviesListInstance;
  }

  // Obtenir la liste des films.
  public getMovies(): Movie[] {
    return this.movies;
  }
}
