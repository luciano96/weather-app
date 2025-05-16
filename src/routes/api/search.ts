import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import axios from "axios";
import { fromPromise } from "neverthrow";

const API_URL = "https://nominatim.openstreetmap.org/search.php?format=jsonv2";

export type GeoPlace = {
  place_id: number;
  licence: string;
  osm_type: "node" | "way" | "relation";
  osm_id: number;
  lat: string;
  lon: string;
  category: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: [string, string, string, string]; // [lat_min, lat_max, lon_min, lon_max]
};

export const APIRoute = createAPIFileRoute("/api/search")({
  GET: async ({ request }) => {
    const searchParams = new URL(request.url).searchParams;

    const res = await fromPromise(
      axios.get<GeoPlace>(`${API_URL}&q=${searchParams.get("q")}`),
      (e) => e as Error
    );

    if (res.isErr()) {
      return json({ detail: "There was an error" }, { status: 500 });
    }

    return json(res.value.data);
  },
});
