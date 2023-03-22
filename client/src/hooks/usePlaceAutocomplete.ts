export interface Place {
  description: string;
  placeId: string;
  mainText: string;
  secondaryText: string;
}

export default function usePlaceAutocomplete() {
  const getPlaces = async (value: string) => {
    if (!value.trim()) {
      return [];
    }

    const res = await fetch(`/api/places?search=${value}`);
    const predictions: Place[] = await res.json();
    return predictions;
  };

  return { getPlaces };
}
