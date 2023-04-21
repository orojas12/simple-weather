import { GeocodeResult } from "../types";

export const geocode = async (placeId: string) => {
  const res = await fetch(`/api/geocode?placeId=${placeId}`);
  const result: GeocodeResult = await res.json();
  return result;
};
