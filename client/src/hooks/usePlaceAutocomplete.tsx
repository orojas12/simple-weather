export interface Place {
  description: string;
  placeId: string;
  mainText: string;
  secondaryText: string;
}

const fakePredictions: Place[] = [
  {
    description: "Paris, France",
    placeId: "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
    mainText: "Paris",
    secondaryText: "France",
  },
  {
    description: "Paris, TX, USA",
    placeId: "ChIJmysnFgZYSoYRSfPTL2YJuck",
    mainText: "Paris",
    secondaryText: "TX, USA",
  },
  {
    description: "Paris, TN, USA",
    placeId: "ChIJ4zHP-Sije4gRBDEsVxunOWg",
    mainText: "Paris",
    secondaryText: "TN, USA",
  },
  {
    description: "Paris, Brant, ON, Canada",
    placeId: "ChIJsamfQbVtLIgR-X18G75Hyi0",
    mainText: "Paris",
    secondaryText: "Brant, ON, Canada",
  },
  {
    description: "Paris, KY, USA",
    placeId: "ChIJsU7_xMfKQ4gReI89RJn0-RQ",
    mainText: "Paris",
    secondaryText: "KY, USA",
  },
];

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
