import axios from "axios";

const API_KEY = "673f263e7f8447bc5b60e5626ec89b6e";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function getMeteoData(ville) {
  // Dans un premier temps on essaye de récupérer les données  météo
  try {
    // data = données récupérées de l'API
    const { data } = await axios.get(API_URL, {
      // paramétres qu'attend l'API
      params: {
        q: ville, // ? q = ville
        appid: API_KEY,
        units: "metric",
        lang: "fr",
      },
    });
    // Je crée current pour plus de lisibilité
    const current = data;

    return {
      temperature: Math.round(current.main.temp), // On arrondit la température à l'int le plus proche
      description: current.weather[0].description, // On récupère la description de la meteo
      humidity: current.main.humidity, // on récupère l'humidité
      windSpeed: Math.round(current.wind.speed), // on récupère la vitesse du vent
      icon: current.weather[0].icon, // on récupère l'icône de la meteo, [0] = premier élément du tableau qui contient les données météo
    };
  } catch (error) {
    console.error("Erreur:", error.message);
    throw error;
  }
}
