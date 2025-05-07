import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { RightNowIn } from "~/components/RightNowIn";
import { SearchLocation } from "~/components/SearchLocation";
import { TempInfo } from "~/components/TempInfo";
import { cn } from "~/lib/utils";
import { WeatherMain, weatherQueryOptions } from "~/lib/utils/weather";

export const Route = createFileRoute("/")({
  component: Weather,
});

const weatherGradients: Record<WeatherMain, string> = {
  Thunderstorm: "bg-gradient-to-br from-gray-700 via-gray-900 to-black",
  Drizzle: "bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500",
  Rain: "bg-gradient-to-br from-blue-500 via-blue-700 to-gray-800",
  Snow: "bg-gradient-to-br from-blue-100 via-white to-blue-200",
  Mist: "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500",
  Smoke: "bg-gradient-to-br from-gray-500 via-gray-700 to-gray-900",
  Haze: "bg-gradient-to-br from-yellow-200 via-yellow-300 to-gray-400",
  Dust: "bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700",
  Fog: "bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600",
  Sand: "bg-gradient-to-br from-yellow-400 via-yellow-600 to-orange-700",
  Ash: "bg-gradient-to-br from-gray-600 via-gray-800 to-black",
  Squall: "bg-gradient-to-br from-blue-600 via-gray-600 to-black",
  Tornado: "bg-gradient-to-br from-gray-800 via-black to-gray-700",
  Clear: "bg-gradient-to-br from-sky-300 via-sky-500 to-blue-700",
  Clouds: "bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600",
};

function Weather() {
  const [location, setLocation] = useState("");
  const { data, isLoading } = useSuspenseQuery(weatherQueryOptions(location));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={cn(
        "bg-white flex flex-col justify-center text-black h-screen v-screen items-center",
        weatherGradients[data?.weather.main ?? "Haze"]
      )}
    >
      <div className="min-w-72">
        <SearchLocation onSubmit={setLocation} defaultLocation={location} />
      </div>
      {data && (
        <TempInfo
          feelsLike={data.feelsLikeTemp}
          temperature={data.temperature}
          min={data.minTemp}
          max={data.maxTemp}
          unit="celsius"
          weather={data.weather}
        />
      )}
    </div>
  );
}
