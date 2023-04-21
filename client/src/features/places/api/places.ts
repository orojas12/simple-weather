import { Place } from "../types";

export const getPlaces = async (value: string) => {
  if (!value.trim()) {
    return [];
  }

  const res = await fetch(`/api/places?search=${value}`);
  const predictions: Place[] = await res.json();
  return predictions;
};
