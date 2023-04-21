import React from "react";
import { Card, Dropdown } from "@/components";
import { CheckIcon, VerticalDotsIcon } from "@/assets/icons/ui";
import "./location.css";

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
    <Card className="location">
      <Card.Content className="location-wrapper">
        <div className="location__content" onClick={() => onClick()}>
          <div className="location__title">{location.mainText}</div>
          <div className="location__subtitle">{location.secondaryText}</div>
        </div>
        <div className="flex align-center gap-1">
          {active ? <CheckIcon className="location__check" /> : null}
          <Dropdown id={location.placeId}>
            <Dropdown.Toggle className="location__btn">
              <VerticalDotsIcon className="location__options" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" items={options} />
          </Dropdown>
        </div>
      </Card.Content>
    </Card>
  );
}
