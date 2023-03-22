interface GeocodeResult {
  placeId: string;
  address: string;
  lat: number;
  lng: number;
}

export default function useGeocode() {
  const geocode = async (placeId: string) => {
    const res = await fetch(`/api/geocode?placeId=${placeId}`);
    const result: GeocodeResult = await res.json();
    return result;
  };

  return { geocode };
}
