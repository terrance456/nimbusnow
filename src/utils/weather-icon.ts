// import type { ComponentType } from "react";
// import ClearDayIcon from "../assets/clear-day.svg";
// import ClearNightIcon from "../assets/clear-night.svg";
// import CloudIcon from "../assets/cloudy.svg";
// import DrizzleIcon from "../assets/drizzle.svg";
// import MistIcon from "../assets/mist.svg";
// import OvercastIcon from "../assets/overcast.svg";
// import PartlyCloudlyDay from "../assets/partly-cloudly-day.svg";
// import PartlyCloudlyNight from "../assets/partly-cloudly-night.svg";
// import RainIcon from "../assets/rain.svg";
// import SnowIcon from "../assets/snow.svg";
// import ThunderstormIcon from "../assets/thunderstorm.svg";

// Replaced SVG components with plain emoji strings.
export const weatherIconMap: Record<string, string> = {
  // Clear
  "01d": "☀️",
  "01n": "☀️",

  // Few clouds / Partly cloudy
  "02d": "🌤️",
  "02n": "🌥️",

  // Scattered clouds / Cloudy
  "03d": "⛅",
  "03n": "⛅",

  // Broken/overcast
  "04d": "🌥️",
  "04n": "🌥️",

  // Drizzle
  "09d": "🌦️",
  "09n": "🌦️",

  // Rain
  "10d": "🌧️",
  "10n": "🌧️",

  // Thunderstorm
  "11d": "🌩️",
  "11n": "🌩️",

  // Snow
  "13d": "🌨️",
  "13n": "🌨️",

  // Mist
  "50d": "🌥️",
  "50n": "🌥️",
};
