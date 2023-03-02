import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LocationContext } from "hooks/useLocation";
import { ArrowDownIcon } from "icons/ui";
import LocationSearch from "./LocationSearch";
import "./addLocation.css";
import { Place } from "hooks/usePlaceAutocomplete";

export default function AddLocationPage() {
  const location = useContext(LocationContext);
  const navigate = useNavigate();

  return (
    <article className="add-location">
      <header className="flex align-center">
        <NavLink to="/locations" replace={true}>
          <button className="btn btn--sm">
            <ArrowDownIcon className="add-location__arrow" />
          </button>
        </NavLink>
        <h1 className="fs-4">Add Location</h1>
      </header>
      <main>
        <LocationSearch
          addLocation={async (place: Place) => {
            try {
              await location?.addLocation(place);
              // show success toast
              navigate("/locations");
            } catch (err) {
              // show error toast
              console.error(err);
            }
          }}
        />
      </main>
    </article>
  );
}
