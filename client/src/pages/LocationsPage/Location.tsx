import React from "react";
import { Card, Dropdown } from "@/components";
import { CheckIcon, VerticalDotsIcon } from "@/assets/icons/ui";

interface LocationProps {
  location: {
    placeId: string;
    description: string;
    mainText: string;
    secondaryText: string;
    lat: number;
    lng: number;
  };
  options: { content: React.ReactNode; action: () => void }[];
  onClick: () => void;
  active: boolean;
}

export default function Location({
  location,
  options,
  onClick,
  active,
}: LocationProps) {
  return (
    <Card className="locations__location">
      <Card.Content className="locations__location-wrapper">
        <div className="locations__location-header" onClick={() => onClick()}>
          <div className="locations__location-title">{location.mainText}</div>
          <div className="locations__location-subtitle">
            {location.secondaryText}
          </div>
        </div>
        <div className="flex align-center">
          {active ? <CheckIcon className="locations__location-check" /> : null}
          <Dropdown id={location.placeId}>
            <Dropdown.Toggle className="locations__btn">
              <VerticalDotsIcon className="locations__location-options" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" items={options} />
          </Dropdown>
        </div>
      </Card.Content>
    </Card>
  );
}
