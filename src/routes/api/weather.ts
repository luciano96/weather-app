import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import axios from "axios";
import { err, fromPromise, ok, okAsync } from "neverthrow";
export type WeatherResponse = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export const APIRoute = createAPIFileRoute("/api/weather")({
  GET: async ({ request }) => {
    console.info("Fetching weather... @", request.url);
    const searchParams = new URL(request.url).searchParams;

    const res = await fromPromise(
      axios.get<WeatherResponse>(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchParams.get("q")}&APPID=${process.env.APPID}`
      ),
      (e) => e as Error
    );

    return json(res.isOk() ? res.value.data : "Could not load promise: " + res.error.message);
  },
});
