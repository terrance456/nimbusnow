import DailyForecast from "@/src/components/DailyForecast/DailyForecast";
import HourlyForecast from "@/src/components/HourlyForecast/HourlyForecast";
import WeatherPrimaryWidget from "@/src/components/WeatherPrimaryWidget";
import { useCurrentLocation } from "@/src/hooks/getLocation";
import { useCurrentWeather } from "@/src/hooks/weatherFetcher";
import React from "react";
import { ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../src/styles/global.css";

export default function Index() {
  const { location, error: locationError } = useCurrentLocation();

  const { data, loading, error } = useCurrentWeather({
    location,
  });

  if (loading)
    return (
      <SafeAreaView className="justify-center items-center flex-1 bg-[#4a90d9]">
        <ActivityIndicator color="#061B4D" size="large" />
      </SafeAreaView>
    );

  if (!data || error || locationError)
    return (
      <SafeAreaView className="justify-center items-center flex-1 bg-[#4a90d9]">
        <Text className="font-sans">{error}</Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView className="p-3 bg-[#4a90d9] flex-1 relative">
      <WeatherPrimaryWidget data={data?.current} />
      <HourlyForecast data={data.hourly} />
      <DailyForecast data={data.daily} />
    </SafeAreaView>
  );
}
