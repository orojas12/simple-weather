import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowDownIcon } from "@/assets/icons/ui";
import LocationSearch from "./LocationSearch";
import { Place } from "@/hooks/usePlaceAutocomplete";
import { ToastContext } from "@/components";
import "./addLocation.css";
import { useLocation } from "@/hooks";

export default function AddLocationPage() {
  const toast = useContext(ToastContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const status = location.data.status;
    if (status?.error) {
      toast?.setToast({
        type: "alert",
        msg: status.msg as string,
      });
      location?.clearStatus();
    } else if (status?.msg) {
      toast?.setToast({
        type: "success",
        msg: status.msg,
      });
      navigate("/locations");
      location.clearStatus();
    }
  }, [location.data.status]);

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
            } catch (err: any) {
              toast?.setToast({
                type: "alert",
                msg: err.message,
              });
              location.clearStatus();
            }
          }}
        />
      </main>
    </article>
  );
}
