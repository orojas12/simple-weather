import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Card } from "@/components";
import { WeatherHour } from "../lib/weather";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip
);

interface TemperatureChartProps {
  weatherHours: WeatherHour[];
  variant: "lg" | "sm";
}

function getTemperatureChartData(weatherHours: WeatherHour[]) {
  return {
    labels: weatherHours.slice(0, 25).map((hour) =>
      hour.dt.toLocaleTimeString([], {
        hour: "numeric",
        hour12: true,
      })
    ),
    datasets: [
      {
        label: "Temperature",
        data: weatherHours.slice(0, 25).map((hour) => hour.temp),
      },
    ],
  };
}

export default function TemperatureChart(props: TemperatureChartProps) {
  const data = getTemperatureChartData(props.weatherHours);

  return (
    <Card
      className={`dashboard__card dashboard__temperature-card dashboard__chart--${props.variant}`}
    >
      <Card.Title align="start" className="dashboard__card-title">
        Temperature
      </Card.Title>
      <Card.Content className={`dashboard__weather-chart--${props.variant}`}>
        <Line
          options={{
            aspectRatio: props.variant === "lg" ? 3 : 2,
            responsive: true,
            scales: {
              x: {
                ticks: {
                  autoSkip: true,
                },
              },
              y: {
                min: 0,
                max: 100,
              },
            },
          }}
          data={data}
        />
      </Card.Content>
    </Card>
  );
}
