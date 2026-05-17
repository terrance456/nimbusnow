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
      <SafeAreaView className="justify-center items-center flex-1 bg-[#8BB8FF]">
        <ActivityIndicator color="#061B4D" size="large" />
      </SafeAreaView>
    );

  if (!data || error || locationError)
    return (
      <SafeAreaView className="justify-center items-center flex-1 bg-[#8BB8FF]">
        <Text>{error}</Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView className="p-3 bg-[#8BB8FF] flex-1">
      <WeatherPrimaryWidget data={data?.current} />
    </SafeAreaView>
  );
}
