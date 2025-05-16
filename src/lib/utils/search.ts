import { queryOptions } from "@tanstack/react-query";
import axios from "axios";
import { WeatherResponse } from "~/routes/api/weather";
import { DEPLOY_URL } from "./weather";
import { GeoPlace } from "~/routes/api/search";

export type GeoResult = {
  displayName: string;
  value: {
    lat: number;
    long: number;
  };
};

const mapToGeoResult = (geoResponse: GeoPlace): GeoResult => ({
  displayName: geoResponse.display_name,
  value: {
    lat: parseFloat(geoResponse.lat),
    long: parseFloat(geoResponse.lon),
  },
});

export const searchQueryOptions = (location: string | null) =>
  queryOptions({
    queryKey: ["search", location],
    queryFn: async () => {
      if (!location) {
        return [] as GeoResult[];
      }
      const searchParams = new URLSearchParams({ q: location });
      return axios
        .get<GeoPlace[]>(DEPLOY_URL + "/api/search?" + searchParams.toString())
        .then((r) => r.data.map(mapToGeoResult))
        .catch((e) => {
          throw new Error("Failed to fetch locations");
        });
    },
  });
