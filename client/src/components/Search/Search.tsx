import React, { useState, useContext } from "react";
import { Combobox } from "components";
import { SearchIcon, LocationIcon } from "icons/ui";
import { LocationContext } from "hooks/useLocation";
import { placeAutocomplete } from "services";
import "./search.css";
import { Place } from "services";

export default function Search() {
  const [predictions, setPredictions] = useState<Place[]>([]);
  const location = useContext(LocationContext);

  const listItems = predictions.map((prediction, i) => ({
    id: prediction.placeId,
    text: prediction.description,
    data: prediction,
  }));

  const onChange = (value: string) => {
    setPredictions(placeAutocomplete(value));
  };

  return (
    <div className="search">
      <Combobox
        id="searchCombobox"
        label="search location"
        autocomplete="list"
        items={listItems}
        select={(prediction) => {
          console.log(prediction);
          location?.addLocation(prediction);
        }}
        onChangeWithDelay={[onChange, 1000]}
        inputIcon={SearchIcon}
        itemIcon={LocationIcon}
      />
    </div>
  );
}
