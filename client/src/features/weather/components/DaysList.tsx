import React from "react";
import WeatherCard from "./WeatherCard";
import { WeatherDay } from "@/lib/weather";

interface DaysListProps {
  units: string;
  day: number;
  days: WeatherDay[] | undefined;
  setDay: (day: number) => void;
  isLoading: boolean;
}

function DaysList(props: DaysListProps) {
  return (
    <div className="dashboard__days">
      {/* <WeatherCard
        units={props.units}
        weather={weather.data?.current}
        onClick={() => setDisplayedWeather(weather.data?.current)}
        active={displayedWeather === weather.data?.current}
      /> */}
      {props.isLoading || !props.days ? (
        <DailyCardPlaceholders />
      ) : (
        <DailyCards
          days={props.days}
          onCardClick={(day) => props.setDay(day)}
          selectedDay={props.day}
          units={props.units}
        />
      )}
    </div>
  );
}

interface DailyCardsProps {
  days: WeatherDay[];
  onCardClick: (day: number) => void;
  selectedDay: number;
  units: string;
}

function DailyCards(props: DailyCardsProps) {
  return (
    <>
      {props.days.map((day, i) => {
        return (
          <WeatherCard
            key={i}
            weather={day}
            onClick={() => props.onCardClick(i)}
            active={props.selectedDay === i}
            units={props.units}
          />
        );
      })}
    </>
  );
}

function DailyCardPlaceholders() {
  const days = Array(8).fill(undefined);
  return (
    <>
      {days.map((day, i) => {
        return (
          <WeatherCard
            key={i}
            weather={day}
            onClick={() => undefined}
            active={false}
            units="imperial"
          />
        );
      })}
    </>
  );
}

export default DaysList;
