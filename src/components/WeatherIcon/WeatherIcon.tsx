import { weatherIconMap } from "@/src/utils/weather-icon";
import React from "react";
import { View } from "react-native";

type Props = {
  iconCode: string;
  size?: number;
  className?: string;
};

export default function WeatherIcon({ iconCode, size = 120, className }: Props) {
  const Icon = weatherIconMap[iconCode] || weatherIconMap["01d"];

  return (
    <View className={className}>
      <Icon width={size} height={size} />
    </View>
  );
}
