import React from "react";
import { Card } from "@/components";
import { useLocation } from "../context";
import { Location } from "../components";
import "./locations-list.css";

export default function LocationsList() {
  const location = useLocation();

  return (
    <div className="locations-list">
      <div className="locations-list__favorite">
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
                  location.deleteLocation(location.data.favoriteLocation!),
              },
            ]}
            onClick={() =>
              location.data.favoriteLocation
                ? location.setLocation(location.data.favoriteLocation)
                : undefined
            }
            active={
              location.data.activeLocation.placeId ===
              location.data.favoriteLocation.placeId
            }
          />
        ) : (
          <Card className="location">
            <Card.Content>No favorite set</Card.Content>
          </Card>
        )}
      </div>
      <div className="locations-list__other">
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
                  action: () => location.setFavorite(value),
                },
                {
                  content: "Delete",
                  action: () => location.deleteLocation(value),
                },
              ]}
              onClick={() => location.setLocation(value)}
              active={location.data.activeLocation.placeId === value.placeId}
            />
          ))}
      </div>
    </div>
  );
}
