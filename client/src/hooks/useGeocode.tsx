interface GeocodeResult {
  placeId: string;
  address: string;
  lat: string;
  lng: string;
}

const fakeGeocodeResults = [
  {
    address: "Paris, France",
    placeId: "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
    lat: 48.86,
    lng: 2.34,
  },
  {
    address: "Paris, TX, USA",
    placeId: "ChIJmysnFgZYSoYRSfPTL2YJuck",
    lat: 33.65,
    lng: -95.54,
  },
  {
    address: "Paris, TN, USA",
    placeId: "ChIJ4zHP-Sije4gRBDEsVxunOWg",
    lat: 36.3,
    lng: -88.3,
  },
  {
    address: "Paris, Brant, ON, Canada",
    placeId: "ChIJsamfQbVtLIgR-X18G75Hyi0",
    lat: 43.19,
    lng: -80.38,
  },
  {
    address: "Paris, KY, USA",
    placeId: "ChIJsU7_xMfKQ4gReI89RJn0-RQ",
    lat: 38.2,
    lng: -84.27,
  },
];

export default function useGeocode() {
  // call geocoding api and update state
  // fetch(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=API_KEY`)

  const geocode = async (placeId: string) => {
    const result = fakeGeocodeResults.find(
      (result) => result.placeId === placeId
    );

    if (result) {
      return result;
    } else {
      throw new Error("Geocoding failed: Invalid place id.");
    }
  };

  return { geocode };
}
