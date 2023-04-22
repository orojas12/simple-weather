import { GeocodeResult } from "../types";
import { API_URL } from "@/config";

export const geocode = async (placeId: string) => {
  const res = await fetch(`${API_URL}/geocode?placeId=${placeId}`);
  const result: GeocodeResult = await res.json();
  return result;
};
