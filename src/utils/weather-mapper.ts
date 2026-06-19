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
  icon: string;
};

export type HourlyForecastT = {
  time: string;
  temperature: number;
  weatherCondition: string;
  icon: string;
};

export type DailyForecast = {
  day: string;
  currentTemp: number;
  lowTemp: number;
  weatherCondition: string;
  icon: string;
  rainChance: number;
};

export type WeatherData = {
  current: CurrentWeatherData;
  hourly: HourlyForecastT[];
  daily: DailyForecast[];
};

export function mapWeatherData(currentData: any, forecastData: any): WeatherData {
  // =========================
  // CURRENT DATA
  // =========================
  const forecastList = Array.isArray(forecastData.list) ? forecastData.list : [];
  const todayTemps = forecastList.map((item: any) => item.main.temp);
  const highTemp = todayTemps.length ? Math.max(...todayTemps) : currentData.main.temp;
  const lowTemp = todayTemps.length ? Math.min(...todayTemps) : currentData.main.temp;
  const rainChance = forecastList[0]?.pop != null ? Math.round(forecastList[0].pop * 100) : 0;

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
    icon: currentData.weather[0].icon,
    rainChance,
  };

  const hourly: HourlyForecastT[] = forecastList.slice(0, 6).map((item: any) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString("en-US", { hour: "numeric", hour12: true }),
    temperature: Math.round(item.main.temp),
    weatherCondition: item.weather[0].main,
    icon: item.weather[0].icon,
  }));

  const getDateKey = (date: Date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getDayLabel = (date: Date) =>
    date.toLocaleDateString("en-US", {
      weekday: "short",
    });

  const summarizeDay = (date: Date, dayItems: any[]): DailyForecast => {
    const temps = dayItems.map((item) => item.main.temp);
    const firstItem = dayItems[0];

    return {
      day: getDayLabel(date),
      // Use the first forecasted temperature as the day's current temp
      currentTemp: Math.round(firstItem.main.temp),
      lowTemp: Math.round(Math.min(...temps)),
      weatherCondition: firstItem.weather[0].main,
      icon: firstItem.weather[0].icon,
      rainChance: firstItem.pop != null ? Math.round(firstItem.pop * 100) : 0,
    };
  };

  const groupedByDay: Record<string, any[]> = {};

  forecastList.forEach((item: any) => {
    const date = new Date(item.dt * 1000);
    const key = getDateKey(date);
    if (!groupedByDay[key]) {
      groupedByDay[key] = [];
    }
    groupedByDay[key].push(item);
  });

  const today = new Date();
  const todayKey = getDateKey(today);

  if (!groupedByDay[todayKey]) {
    groupedByDay[todayKey] = [
      {
        dt: Math.floor(today.getTime() / 1000),
        main: { temp: current.temperature },
        weather: [currentData.weather?.[0] ?? { main: current.weatherCondition, icon: current.icon }],
        pop: current.rainChance / 100,
      },
    ];
  }

  const daily: DailyForecast[] = [];
  let lastKnownForecast: DailyForecast | null = null;

  for (let i = 0; i < 7; i += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateKey = getDateKey(date);
    const dayItems = groupedByDay[dateKey];

    if (dayItems && dayItems.length > 0) {
      const dayForecast = summarizeDay(date, dayItems);
      daily.push(dayForecast);
      lastKnownForecast = dayForecast;
    } else if (lastKnownForecast) {
      daily.push({
        ...lastKnownForecast,
        day: getDayLabel(date),
      });
    } else if (forecastList.length > 0) {
      const fallbackItem = forecastList[0];
      const fallbackForecast: DailyForecast = {
        day: getDayLabel(date),
        currentTemp: Math.round(fallbackItem.main.temp),
        lowTemp: Math.round(fallbackItem.main.temp),
        weatherCondition: fallbackItem.weather[0].main,
        icon: fallbackItem.weather[0].icon,
        rainChance: fallbackItem.pop != null ? Math.round(fallbackItem.pop * 100) : 0,
      };
      daily.push(fallbackForecast);
      lastKnownForecast = fallbackForecast;
    } else {
      daily.push({
        day: getDayLabel(date),
        currentTemp: current.temperature,
        lowTemp: current.temperature,
        weatherCondition: current.weatherCondition,
        icon: current.icon,
        rainChance: current.rainChance,
      });
    }
  }

  return {
    current,
    hourly,
    daily,
  };
}
