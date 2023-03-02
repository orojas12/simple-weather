import React, { useState, useEffect, useRef } from "react";
import { AddIcon, CloseIcon, SearchIcon } from "icons/ui";
import { usePlaceAutocomplete } from "hooks";
import { Place } from "hooks/usePlaceAutocomplete";
import { Card } from "components";

interface LocationSearchProps {
  addLocation: (place: Place) => void;
}

export default function LocationSearch({ addLocation }: LocationSearchProps) {
  const [value, setValue] = useState("");
  const [places, setPlaces] = useState<Place[] | []>([]);
  const { getPlaces } = usePlaceAutocomplete();
  const timeoutId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      setPlaces(getPlaces(value));
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
        {places.map((place) => (
          <Card key={place.placeId}>
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
        ))}
      </div>
    </div>
  );
}
