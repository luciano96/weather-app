import { queryOptions } from "@tanstack/react-query";
import axios from "axios";
import { WeatherResponse } from "~/routes/api/weather";

export const DEPLOY_URL = "http://localhost:3000";

export type WeatherMain =
  | "Thunderstorm"
  | "Drizzle"
  | "Rain"
  | "Snow"
  | "Mist"
  | "Smoke"
  | "Haze"
  | "Dust"
  | "Fog"
  | "Sand"
  | "Ash"
  | "Squall"
  | "Tornado"
  | "Clear"
  | "Clouds";

export type WeatherInfo = {
  temperature: number;
  maxTemp: number;
  minTemp: number;
  weather: { main: WeatherMain; description: string; imgUrl: string };
  feelsLikeTemp: number;
};

const mapToWeatherInfo = (weatherResponse: WeatherResponse): WeatherInfo => ({
  feelsLikeTemp: weatherResponse.main.feels_like,
  temperature: weatherResponse.main.temp,
  maxTemp: weatherResponse.main.temp_max,
  minTemp: weatherResponse.main.temp_min,
  weather: {
    main: (weatherResponse.weather[0].main.substring(0, 1).toUpperCase() +
      weatherResponse.weather[0].main.substring(1)) as WeatherMain,
    description: weatherResponse.weather[0].description,
    imgUrl: `https://openweathermap.org/img/wn/${weatherResponse.weather[0].icon}@2x.png`,
  },
});

export const weatherQueryOptions = (location: string) =>
  queryOptions({
    queryKey: ["weather", location],
    queryFn: async () => {
      if (!location) {
        return null;
      }
      const searchParams = new URLSearchParams({ q: location });
      return axios
        .get<WeatherResponse>(
          DEPLOY_URL + "/api/weather?" + searchParams.toString()
        )
        .then(
          (r) => (console.log("BUT CAME HERE FIRST?"), mapToWeatherInfo(r.data))
        )
        .catch((e) => {
          throw new Error("Failed to fetch weather");
        });
    },
  });
