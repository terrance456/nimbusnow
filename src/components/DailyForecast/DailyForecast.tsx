import { DailyForecast as DailyForecastT } from "@/src/utils/weather-mapper";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import * as Haptics from "expo-haptics";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import WeatherIcon from "../WeatherIcon/WeatherIcon";

interface DailyForecastProps {
  data: DailyForecastT[]; // Assuming you have a type for daily forecast data
}

export default function DailyForecast({ data }: DailyForecastProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isInitialMount, setIsInitailMount] = useState(true);

  // Snap points: higher initial position and full expansion
  const snapPoints = useMemo(() => ["32%", "70%"], []);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (isInitialMount) return;
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    },
    [isInitialMount],
  );

  React.useEffect(() => {
    setIsInitailMount(false);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1, position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}>
      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0} // Start at snap index 1
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleIndicatorStyle={styles.handle}
        backgroundStyle={styles.sheetBackground}
      >
        <BottomSheetFlatList
          contentContainerStyle={[styles.sheetContent, { gap: 4 }]}
          data={data.slice(0, 7)}
          keyExtractor={(item, index) => `${item.day}-${index}`}
          ListHeaderComponent={() => <Text className="text-center font-medium text-xl my-2">7-Day Forecast</Text>}
          renderItem={({ item }) => (
            <View className="flex-row gap-4 items-center p-5 bg-[#f6f8fa] rounded-xl">
              <Text className="w-[20%]">{item.day}</Text>
              <WeatherIcon className="w-[24%] text-center" iconCode={item.icon} size={40} />
              <Text className="w-[25%]">{item.highTemp}°C</Text>
              <Text className="flex-1">{item.weatherCondition}</Text>
            </View>
          )}
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  handle: { backgroundColor: "#ccc", width: 40 },
  sheetBackground: { backgroundColor: "white", borderRadius: 24 },
  sheetContent: { paddingHorizontal: 20 },
});
