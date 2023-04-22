import React from "react";
import { Card } from "@/components";
import { HorizonIcon, SunnyIcon, MoonIcon } from "../assets/icons";
import { WeatherDay } from "../lib/weather";

interface DayTempsProps {
  day: WeatherDay;
  units: string;
}

export default function DayTemps({ day, units }: DayTempsProps) {
  let mornTemp = 0;
  let dayTemp = 0;
  let eveTemp = 0;
  let nightTemp = 0;
  if (typeof day.temp === "object") {
    mornTemp = Math.round(day.getTemp(units, "morn"));
    dayTemp = Math.round(day.getTemp(units, "day"));
    eveTemp = Math.round(day.getTemp(units, "eve"));
    nightTemp = Math.round(day.getTemp(units, "night"));
  }

  return (
    <Card className="dashboard__day-temps">
      <Card.Content className="dashboard__day-temps-content ">
        <div className="dashboard__day-temp">
          <span className="clr-dark-100 text-center">Morning</span>
          <HorizonIcon className="dashboard__weather-icon" />
          <span className="fs-4 text-center">{mornTemp}&deg;</span>
        </div>
        <div className="dashboard__day-temp">
          <span className="clr-dark-100 text-center">Day</span>
          <SunnyIcon className="dashboard__weather-icon" />
          <span className="fs-4 text-center">{dayTemp}&deg;</span>
        </div>
        <div className="dashboard__day-temp">
          <span className="clr-dark-100 text-center">Evening</span>
          <HorizonIcon className="dashboard__weather-icon" />
          <span className="fs-4 text-center">{eveTemp}&deg;</span>
        </div>
        <div className="dashboard__day-temp">
          <span className="clr-dark-100 text-center">Night</span>
          <MoonIcon className="dashboard__weather-icon" />
          <span className="fs-4 text-center">{nightTemp}&deg;</span>
        </div>
      </Card.Content>
    </Card>
  );
}
