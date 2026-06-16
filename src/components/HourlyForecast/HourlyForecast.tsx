import { HourlyForecastT } from "@/src/utils/weather-mapper";
import React from "react";
import { Text, View } from "react-native";
import WeatherIcon from "../WeatherIcon/WeatherIcon";

interface HourlyForecastProps {
  data: HourlyForecastT[];
}

const HourlyForecast = ({ data }: HourlyForecastProps) => {
  return (
    <View className="flex-row gap-1 mt-7 px-4">
      {data.slice(0, 6).map((item, index) => (
        <View key={index} className="bg-black/5 rounded-[20px] gap-1 items-center justify-center flex-1 py-4">
          <Text className="text-white">{item.time}</Text>
          <WeatherIcon size={40} iconCode={item.icon} />
          <Text className="text-white">{item.temperature}°</Text>
        </View>
      ))}
    </View>
  );
};

export default HourlyForecast;
