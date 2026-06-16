import { CurrentWeatherData } from "@/src/utils/weather-mapper";
import { LinearGradient } from "expo-linear-gradient";
import { cssInterop } from "nativewind";
import React from "react";
import { Text, View } from "react-native";
import WeatherIcon from "../WeatherIcon/WeatherIcon";

const MappedLinearGradient = cssInterop(LinearGradient, {
  className: "style",
});

export interface WeatherPrimaryWidgetProps {
  data: CurrentWeatherData;
}

const WeatherPrimaryWidget: React.FC<WeatherPrimaryWidgetProps> = (props: WeatherPrimaryWidgetProps) => {
  return (
    <MappedLinearGradient
      colors={["#5286ca", "#133e7d", "#021848"]}
      start={{ x: 0, y: 0.2 }}
      end={{ x: 0.5, y: 1 }}
      className="p-6 overflow-hidden rounded-[28px] h-[50%] gap-4 justify-between"
    >
      <View className="flex-1 justify-between">
        <View>
          <Text className="text-white text-3xl mb-1">{props.data.locationName}</Text>
          <Text className="text-white">{props.data.date}</Text>
        </View>
        <View className="flex justify-center items-center flex-row">
          <WeatherIcon iconCode={props.data.icon} />
          <View>
            <Text className="text-white text-6xl font-extrabold mt-2 leading-[50px]">{props.data.temperature}°</Text>
            <Text className="text-white text-2xl -mt-1">{props.data.weatherCondition}</Text>
          </View>
        </View>
        <View className="gap-4 flex-row">
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
      </View>
    </MappedLinearGradient>
  );
};

export default WeatherPrimaryWidget;
