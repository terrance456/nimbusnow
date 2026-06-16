import type { ComponentType } from "react";
import ClearDayIcon from "../assets/clear-day.svg";
import ClearNightIcon from "../assets/clear-night.svg";
import CloudIcon from "../assets/cloudy.svg";
import DrizzleIcon from "../assets/drizzle.svg";
import MistIcon from "../assets/mist.svg";
import OvercastIcon from "../assets/overcast.svg";
import PartlyCloudlyDay from "../assets/partly-cloudly-day.svg";
import PartlyCloudlyNight from "../assets/partly-cloudly-night.svg";
import RainIcon from "../assets/rain.svg";
import SnowIcon from "../assets/snow.svg";
import ThunderstormIcon from "../assets/thunderstorm.svg";

export const weatherIconMap: Record<string, ComponentType<any>> = {
  "01d": ClearDayIcon,
  "01n": ClearNightIcon,

  "02d": PartlyCloudlyDay,
  "02n": PartlyCloudlyNight,

  "03d": CloudIcon,
  "03n": CloudIcon,

  "04d": OvercastIcon,
  "04n": OvercastIcon,

  "09d": DrizzleIcon,
  "09n": DrizzleIcon,

  "10d": RainIcon,
  "10n": RainIcon,

  "11d": ThunderstormIcon,
  "11n": ThunderstormIcon,

  "13d": SnowIcon,
  "13n": SnowIcon,

  "50d": MistIcon,
  "50n": MistIcon,
};
