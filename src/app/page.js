"use client";

import { useState, useEffect } from "react";
import { getMeteoData } from "./meteo";
import conf from "./conf.json";

export default function Home() {
  const [meteo, setMeteo] = useState(null);
  const [error, setError] = useState(null);

  // On utilise useEffect pour récupérer les données météo une seul fois au chargement de la page
  useEffect(() => {
    async function loadMeteo() {
      try {
        // On attend que la fonction getMeteoData(conf.ville) retourne les données météo avant d'aller plus loin
        const data = await getMeteoData(conf.ville); // on passe l'argument conf.ville à la fonction getMeteoData(ville)
        setMeteo(data);
        // on initialise l'erreur à null par default
        setError(null);
      } catch (error) {
        // Si il y a une erreur on met le message d'erreur dans le state error
        setError("Impossible de charger la météo");
      }
    }

    loadMeteo();
    const interval = setInterval(loadMeteo, 3600000); // On appelle la fonction loadMeteo toutes les heures
    return () => clearInterval(interval);
  }, []);

  if (error) {
    // Si il y a une erreur on affiche le message d'erreur que on a mis dans le state SetError
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-8 text-blue-600 text-center">
          Météo à {conf.ville}
        </h1>

        {meteo && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <img
                src={`https://openweathermap.org/img/wn/${meteo.icon}@2x.png`}
                alt={meteo.description}
                className="w-24 h-24"
              />
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-gray-800">
                {meteo.temperature}°C
              </div>
              <div className="text-xl text-gray-600  mt-2">
                {meteo.description}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <div className="text-gray-500">Humidité</div>
                <div className="text-lg font-semibold">{meteo.humidity}%</div>
              </div>
              <div className="text-center">
                <div className="text-gray-500">Vent</div>
                <div className="text-lg font-semibold">
                  {meteo.windSpeed} km/h
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
