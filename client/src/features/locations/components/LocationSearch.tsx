import React, { useState, useEffect, useRef } from "react";
import { AddIcon, CloseIcon, SearchIcon } from "@/assets/icons/ui";
import { usePlaceAutocomplete } from "@/hooks";
import { Place } from "@/hooks/usePlaceAutocomplete";
import { Card } from "@/components";
import { useNotifications } from "@/context/notifications";
import "./location-search.css";

interface LocationSearchProps {
  addLocation: (place: Place) => void;
}

export default function LocationSearch({ addLocation }: LocationSearchProps) {
  const { addNotification } = useNotifications();
  const [value, setValue] = useState("");
  const [places, setPlaces] = useState<Place[] | []>([]);
  const { getPlaces } = usePlaceAutocomplete();
  const timeoutId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(async () => {
      try {
        const places = await getPlaces(value);
        setPlaces(places);
      } catch (err: any) {
        console.error(err);
        addNotification({
          type: "error",
          message: "Oops, something went wrong.",
        });
      }
    }, 1000);
  }, [value]);

  return (
    <div className="location-search">
      <div className="location-search__input-wrapper">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search location..."
        />
        {value ? (
          <button
            className="location-search__clear"
            onClick={() => setValue("")}
          >
            <CloseIcon />
          </button>
        ) : (
          <SearchIcon className="location-search__icon" />
        )}
      </div>
      <div className="location-search__results">
        {places.length ? (
          places.map((place, i) => (
            <Card key={place.placeId || i} className="location-search__result">
              <Card.Content className="flex justify-between align-center">
                <div>
                  <div className="location-search__result-title">
                    {place.mainText}
                  </div>
                  <div className="location-search__result-subtitle">
                    {place.secondaryText}
                  </div>
                </div>
                <button
                  className="btn btn--sm location-search__add"
                  onClick={() => addLocation(place)}
                >
                  <AddIcon />
                </button>
              </Card.Content>
            </Card>
          ))
        ) : (
          <Card className="location-search__result">
            <Card.Content>No locations matched your search.</Card.Content>
          </Card>
        )}
      </div>
    </div>
  );
}
