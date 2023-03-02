import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LocationContext } from "hooks/useLocation";
import { AddIcon } from "icons/ui";
import "./locations.css";
import { Card } from "components";
import Location from "./Location";

export default function LocationsPage() {
  const location = useContext(LocationContext);

  return (
    <article className="locations">
      <header>
        <h1>Manage Locations</h1>
        <NavLink to="add">
          <button className="btn btn--sm">
            <AddIcon className="locations__add" />
          </button>
        </NavLink>
      </header>
      <main>
        <div className="locations__favorite">
          <h2>Favorite Location</h2>
          {location?.data.favoriteLocation ? (
            <Location
              location={location.data.favoriteLocation}
              options={[
                {
                  content: "Remove favorite",
                  action: location.removeFavorite,
                },
                {
                  content: "Delete",
                  action: () =>
                    location.deleteLocation(
                      location.data.favoriteLocation?.placeId || ""
                    ),
                },
              ]}
              active={
                location.data.activeLocation.placeId ===
                location.data.favoriteLocation.placeId
              }
            />
          ) : (
            <Card>
              <Card.Content>No favorite set</Card.Content>
            </Card>
          )}
        </div>
        <div className="locations__other">
          <h2>Other Locations</h2>
          {location?.data.savedLocations
            .filter(
              (value) =>
                value.placeId !== location?.data.favoriteLocation?.placeId
            )
            .map((value) => (
              <Location
                key={value.placeId}
                location={value}
                options={[
                  {
                    content: "Set as favorite",
                    action: () => location.setFavorite(value.placeId),
                  },
                  {
                    content: "Delete",
                    action: () => location.deleteLocation(value.placeId),
                  },
                ]}
                active={location.data.activeLocation.placeId === value.placeId}
              />
            ))}
        </div>
      </main>
    </article>
  );
}
