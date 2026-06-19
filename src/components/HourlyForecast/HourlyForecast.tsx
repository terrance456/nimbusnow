import { HourlyForecastT } from "@/src/utils/weather-mapper";
import { clsx } from "clsx";
import React from "react";
import { Text, View } from "react-native";
import WeatherIcon from "../WeatherIcon/WeatherIcon";

interface HourlyForecastProps {
  data: HourlyForecastT[];
}

const HourlyForecast = ({ data }: HourlyForecastProps) => {
  return (
    <View className="flex-row gap-1 mt-7 px-4">
      {data.slice(0, 6).map((item, index) => {
        const isFirstItem = index === 0;
        return (
          <View
            key={index}
            className={clsx(
              "bg-white/15 rounded-[20px] gap-1 items-center justify-center flex-1 py-4",
              isFirstItem && "border border-white/30 bg-white/30",
            )}
          >
            <Text className="text-white">{isFirstItem ? "Now" : item.time}</Text>
            <WeatherIcon size={30} iconCode={item.icon} />
            <Text className="text-white">{item.temperature}°</Text>
          </View>
        );
      })}
    </View>
  );
};

export default HourlyForecast;
