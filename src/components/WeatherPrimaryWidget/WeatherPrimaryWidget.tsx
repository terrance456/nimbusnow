import { CurrentWeatherData } from "@/src/utils/weather-mapper";
import { LinearGradient } from "expo-linear-gradient";
import { cssInterop } from "nativewind";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import WeatherIcon from "../WeatherIcon/WeatherIcon";

const MappedLinearGradient = cssInterop(LinearGradient, {
  className: "style",
});

export interface WeatherPrimaryWidgetProps {
  data: CurrentWeatherData;
}

const WeatherPrimaryWidget: React.FC<WeatherPrimaryWidgetProps> = (props: WeatherPrimaryWidgetProps) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 750, easing: Easing.out(Easing.cubic) });
    translateY.value = withTiming(0, { duration: 750, easing: Easing.out(Easing.cubic) });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[animatedStyle]} className="w-full h-[50%]">
      <MappedLinearGradient
        colors={["#1a3a6b", "#2a5298", "#3a6bc0"]}
        locations={[0, 0.55, 1]}
        start={{ x: 0.15, y: 0 }}
        end={{ x: 0.85, y: 1 }}
        className="p-6 overflow-hidden rounded-[28px] gap-4 justify-between h-full"
      >
        <View className="flex-1 justify-between">
          <View>
            <Text className="text-white text-3xl mb-1">{props.data.locationName}</Text>
            <Text className="text-white">{props.data.date}</Text>
          </View>
          <View className="flex justify-center items-center flex-row gap-2">
            <WeatherIcon iconCode={props.data.icon} size={110} />
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
    </Animated.View>
  );
};

export default WeatherPrimaryWidget;
