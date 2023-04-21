import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowDownIcon } from "@/assets/icons/ui";
import { LocationSearch } from "../components";
import { Place } from "@/hooks/usePlaceAutocomplete";
import { useLocation } from "../context";
import { useNotifications } from "@/context/notifications";
import "./addLocation.css";

export default function AddLocation() {
  const { addNotification } = useNotifications();
  const location = useLocation();
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
              await location.addLocation(place);
              navigate("/locations");
            } catch (err: unknown) {
              if (err instanceof Error)
                addNotification({
                  type: "error",
                  message: err.message,
                });
              location.clearStatus();
            }
          }}
        />
      </main>
    </article>
  );
}
