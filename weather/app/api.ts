import { WeatherResponse } from "./IWeather";

const apiURL = "http://api.weatherapi.com/v1";

export const getWeather = async (place: string): Promise<WeatherResponse> => {
  const res = await fetch(
    `${apiURL}/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API}&q=${place}&aqi=no`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = await res.json();
  return data;
};
