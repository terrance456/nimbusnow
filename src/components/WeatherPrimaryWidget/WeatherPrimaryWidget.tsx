import CloudyImg from "@/src/assets/cloudy.png";
import { CurrentWeatherData } from "@/src/utils/weather-mapper";
import { LinearGradient } from "expo-linear-gradient";
import { cssInterop } from "nativewind";
import React from "react";
import { Image, Text, View } from "react-native";

const MappedLinearGradient = cssInterop(LinearGradient, {
  className: "style",
});

export interface WeatherPrimaryWidgetProps {
  data: CurrentWeatherData;
}

const WeatherPrimaryWidget: React.FC<WeatherPrimaryWidgetProps> = (props: WeatherPrimaryWidgetProps) => {
  return (
    <MappedLinearGradient
      colors={["#6EA8FF", "#1E5CCB", "#061B4D"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      className="p-6 overflow-hidden rounded-[28px]"
    >
      <View className="mb-7">
        <Text className="text-white text-3xl mb-1">{props.data.locationName}</Text>
        <Text className="text-white">{props.data.date}</Text>
      </View>
      <View className="flex justify-center items-center flex-row mb-7">
        <Image className="h-24 w-24 mr-5" source={CloudyImg} />
        <View className="items-center">
          <Text className="text-white text-6xl font-extrabold mt-2">{props.data.temperature}˚</Text>
          <Text className="text-white text-2xl">{props.data.weatherCondition}</Text>
        </View>
      </View>
      <View className="gap-4 flex-row mb-3">
        <View className="items-center flex-1 rounded-[20px] bg-black/30 p-4">
          <Text className="text-white text-lg">High: {props.data.highTemp}˚</Text>
        </View>
        <View className="items-center flex-1 rounded-[20px] bg-black/30 p-4">
          <Text className="text-white text-lg">Low: {props.data.lowTemp}˚</Text>
        </View>
      </View>
      <View>
        <View className="items-center rounded-[20px] bg-black/30 p-4 flex-row">
          <View className="items-center border-r border-white/20 flex-1">
            <Text className="text-white/60">Humidity</Text>
            <Text className="text-white text-xl font-bold">{props.data.humidity}%</Text>
          </View>
          <View className="items-center border-r border-white/20 flex-1">
            <Text className="text-white/60">Wind</Text>
            <Text className="text-white text-xl font-bold">{props.data.windSpeed} km/h</Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-white/60">Rain</Text>
            <Text className="text-white text-xl font-bold">{props.data.rainChance}%</Text>
          </View>
        </View>
      </View>
    </MappedLinearGradient>
  );
};

export default WeatherPrimaryWidget;
