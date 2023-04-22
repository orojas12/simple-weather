import { Place } from "../types";
import { API_URL } from "@/config";

export const getPlaces = async (value: string) => {
  if (!value.trim()) {
    return [];
  }

  const res = await fetch(`${API_URL}/places?search=${value}`);
  const predictions: Place[] = await res.json();
  return predictions;
};
