import React from "react";
import { Accordian } from "@components";
import { AlertIcon } from "@icons/ui";
import { WeatherAlert } from "@lib/weather";

interface WeatherAlertProps {
  alert: WeatherAlert;
}

export default function WeatherAlertAccordian({ alert }: WeatherAlertProps) {
  return (
    <Accordian className="dashboard__alert">
      <Accordian.Item>
        <Accordian.Toggle>
          <div className="dashboard__alert-title">
            <AlertIcon className="dashboard__alert-icon" />
            <h2>{alert.event}</h2>
          </div>
          <Accordian.Icon className="dashboard__alert-icon" />
        </Accordian.Toggle>
        <Accordian.Panel>{alert.description}</Accordian.Panel>
      </Accordian.Item>
    </Accordian>
  );
}
