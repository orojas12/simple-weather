import { useState, useEffect } from "react";

interface Prediction {
  description: string;
  placeId: string;
  mainText: string;
  secondaryText: string;
}

const fakePredictions = [
  {
    description: "Paris, France",
    placeId: "100",
    mainText: "Paris",
    secondaryText: "France",
  },
  {
    description: "Paris, TX, USA",
    placeId: "101",
    mainText: "Paris",
    secondaryText: "TX, USA",
  },
  {
    description: "Paris, TN, USA",
    placeId: "102",
    mainText: "Paris",
    secondaryText: "TN, USA",
  },
  {
    description: "Paris, Brant, ON, Canada",
    placeId: "103",
    mainText: "Paris",
    secondaryText: "Brant, ON, Canada",
  },
  {
    description: "Paris, KY, USA",
    placeId: "104",
    mainText: "Paris",
    secondaryText: "KY, USA",
  },
];

export default function usePlaceAutocomplete() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  const autocomplete = async (value: string) => {
    if (!value.trim()) {
      return setPredictions([]);
    }
    // call api here and update state
    // fetch(
    //   "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Paris&types=geocode&key=YOUR_API_KEY"
    // );
    const results = fakePredictions.filter((prediction) =>
      prediction.description.toLowerCase().includes(value.toLowerCase())
    );
    setPredictions(results);
  };

  return [predictions, autocomplete] as const;
}
