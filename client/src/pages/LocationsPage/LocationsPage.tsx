import React, { useContext, useState } from "react";
import { LocationContext } from "hooks/useLocation";
import { AddIcon, VerticalDotsIcon } from "icons/ui";
import "./locations.css";
import { Card, Dropdown } from "components";

export default function LocationsPage() {
  const location = useContext(LocationContext);

  return (
    <article className="locations">
      <header>
        <h1>Manage Locations</h1>
        <button className="btn btn--sm">
          <AddIcon className="locations__add" />
        </button>
      </header>
      <main>
        <div className="locations__favorite">
          <h2>Favorite Location</h2>
          {location?.data.favoriteLocation ? (
            <FavoriteLocation
              location={location.data.favoriteLocation}
              removeFavorite={location.removeFavorite}
              deleteLocation={() =>
                location.deleteLocation(
                  location.data.favoriteLocation?.placeId || ""
                )
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
                setFavorite={() => location.setFavorite(value.placeId)}
                deleteLocation={() => location.deleteLocation(value.placeId)}
              />
            ))}
        </div>
      </main>
    </article>
  );
}

interface LocationProps {
  location: {
    placeId: string;
    description: string;
    mainText: string;
    secondaryText: string;
    lat: number;
    lng: number;
  };
  setFavorite: () => void;
  deleteLocation: () => void;
}

interface FavoriteLocationProps {
  location: {
    placeId: string;
    description: string;
    mainText: string;
    secondaryText: string;
    lat: number;
    lng: number;
  };
  removeFavorite: () => void;
  deleteLocation: () => void;
}

function Location({ location, setFavorite, deleteLocation }: LocationProps) {
  return (
    <Card className="locations__location">
      <Card.Content className="locations__location-wrapper">
        <div>
          <div className="locations__location-title">{location.mainText}</div>
          <div className="locations__location-subtitle">
            {location.secondaryText}
          </div>
        </div>
        <Dropdown id={location.placeId}>
          <Dropdown.Toggle className="locations__btn">
            <VerticalDotsIcon className="locations__location-options" />
          </Dropdown.Toggle>
          <Dropdown.Menu
            items={[
              {
                content: "Set as favorite",
                action: setFavorite,
              },
              {
                content: "Delete",
                action: deleteLocation,
              },
            ]}
          />
        </Dropdown>
      </Card.Content>
    </Card>
  );
}

function FavoriteLocation({
  location,
  removeFavorite,
  deleteLocation,
}: FavoriteLocationProps) {
  return (
    <Card className="locations__location">
      <Card.Content className="locations__location-wrapper">
        <div>
          <div className="locations__location-title">{location.mainText}</div>
          <div className="locations__location-subtitle">
            {location.secondaryText}
          </div>
        </div>
        <Dropdown id={location.placeId}>
          <Dropdown.Toggle className="locations__btn">
            <VerticalDotsIcon className="locations__location-options" />
          </Dropdown.Toggle>
          <Dropdown.Menu
            items={[
              {
                content: "Remove favorite",
                action: removeFavorite,
              },
              {
                content: "Delete",
                action: deleteLocation,
              },
            ]}
          />
        </Dropdown>
      </Card.Content>
    </Card>
  );
}
