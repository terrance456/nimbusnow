import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { createMMKV } from "react-native-mmkv";
import { mapWeatherData, WeatherData } from "../utils/weather-mapper";

export const storage = createMMKV({
  id: "weatherStorage--rn",
});

const getWeatherApiKey = () => {
  const extra = (Constants.expoConfig ?? Constants.manifest)?.extra as { WEATHER_API_KEY?: string } | undefined;
  return extra?.WEATHER_API_KEY;
};

type UseCurrentWeatherParams = {
  location: { lat: number; lon: number } | null;
};

type UseCurrentWeatherReturn = {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
};

const getWeatherApiUrl = (lat: number, lon: number, apiKey: string) => {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
};

const getForecastApiUrl = (lat: number, lon: number, apiKey: string) => {
  return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 mins

export const useCurrentWeather = ({ location }: UseCurrentWeatherParams): UseCurrentWeatherReturn => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        const cacheKey = `weather_${location.lat.toFixed(2)}_${location.lon.toFixed(2)}`;
        const cached = storage.getString(cacheKey) || "{}";
        const parsedCache = JSON.parse(cached);
        const isCacheValid = Date.now() - parsedCache?.timestamp < CACHE_DURATION;

        if (cached && isCacheValid) {
          setData(parsedCache.data);
          setLoading(false);
          return;
        }

        const API_KEY = getWeatherApiKey();

        const [currentRes, forecastRes] = await Promise.all([
          fetch(getWeatherApiUrl(location.lat, location.lon, API_KEY as string)),
          fetch(getForecastApiUrl(location.lat, location.lon, API_KEY as string)),
        ]);

        if (!currentRes.ok || !forecastRes.ok) {
          throw new Error("Failed to fetch current weather");
        }

        const currentData = await currentRes.json();
        const forecastData = await forecastRes.json();
        const mappedData = mapWeatherData(currentData, forecastData);

        storage.set(
          cacheKey,
          JSON.stringify({
            timestamp: Date.now(),
            data: mappedData,
          }),
        );

        setData(mappedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  return {
    data,
    loading,
    error,
  };
};
