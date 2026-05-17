export type CurrentWeatherData = {
  locationName: string;
  date: string;
  temperature: number;
  weatherCondition: string;
  highTemp: number;
  lowTemp: number;
  humidity: number;
  windSpeed: number;
  rainChance: number;
};

export type HourlyForecast = {
  time: string;
  temperature: number;
  weatherCondition: string;
  icon: string;
};

export type DailyForecast = {
  day: string;
  highTemp: number;
  lowTemp: number;
  weatherCondition: string;
  icon: string;
  rainChance: number;
};

export type WeatherData = {
  current: CurrentWeatherData;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
};

export function mapWeatherData(currentData: any, forecastData: any) {
  // =========================
  // CURRENT DATA
  // =========================
  const todayTemps = forecastData.list.map((item: any) => item.main.temp);
  const highTemp = Math.max(...todayTemps);
  const lowTemp = Math.min(...todayTemps);
  const rainChance = forecastData.list?.[0]?.pop != null ? Math.round(forecastData.list[0].pop * 100) : 0;

  const current: CurrentWeatherData = {
    locationName: `${currentData.name}, ${currentData.sys.country}`,
    date: new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }),
    temperature: Math.round(currentData.main.temp),
    weatherCondition: currentData.weather[0].description
      .split(" ")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    highTemp: Math.round(highTemp),
    lowTemp: Math.round(lowTemp),
    humidity: currentData.main.humidity,
    windSpeed: Math.round(currentData.wind.speed),
    rainChance,
  };

  const hourly: HourlyForecast[] = forecastData.list.slice(0, 8).map((item: any) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString("en-US", { hour: "numeric", hour12: true }),
    temperature: Math.round(item.main.temp),
    weatherCondition: item.weather[0].main,
    icon: item.weather[0].icon,
  }));

  const groupedByDay: Record<string, any[]> = {};

  forecastData.list.forEach((item: any) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!groupedByDay[date]) {
      groupedByDay[date] = [];
    }
    groupedByDay[date].push(item);
  });

  const daily: DailyForecast[] = Object.keys(groupedByDay)
    .slice(0, 7)
    .map((dateKey) => {
      const dayItems = groupedByDay[dateKey];
      const temps = dayItems.map((item) => item.main.temp);
      const firstItem = dayItems[0];

      return {
        day: new Date(firstItem.dt * 1000).toLocaleDateString("en-US", {
          weekday: "short",
        }),
        highTemp: Math.round(Math.max(...temps)),
        lowTemp: Math.round(Math.min(...temps)),
        weatherCondition: firstItem.weather[0].main,
        icon: firstItem.weather[0].icon,
        rainChance: firstItem.pop != null ? Math.round(firstItem.pop * 100) : 0,
      };
    });

  return {
    current,
    hourly,
    daily,
  };
}
