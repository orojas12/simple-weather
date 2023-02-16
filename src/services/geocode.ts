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
    lat: "100",
    lng: "-100",
  },
  {
    address: "Paris, TX, USA",
    placeId: "ChIJmysnFgZYSoYRSfPTL2YJuck",
    lat: "101",
    lng: "-101",
  },
  {
    address: "Paris, TN, USA",
    placeId: "ChIJ4zHP-Sije4gRBDEsVxunOWg",
    lat: "102",
    lng: "-102",
  },
  {
    address: "Paris, Brant, ON, Canada",
    placeId: "ChIJsamfQbVtLIgR-X18G75Hyi0",
    lat: "103",
    lng: "-103",
  },
  {
    address: "Paris, KY, USA",
    placeId: "ChIJsU7_xMfKQ4gReI89RJn0-RQ",
    lat: "104",
    lng: "-104",
  },
];

export default async function geocode(placeId: string) {
  // call geocoding api and update state
  // fetch(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=API_KEY`)
  const result = fakeGeocodeResults.find(
    (result) => result.placeId === placeId
  );
  if (result) {
    return result;
  } else {
    console.error("Geocoding failed: Invalid place id.");
    return null;
  }
}
