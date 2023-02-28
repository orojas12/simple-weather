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
import { Bar, Line } from "react-chartjs-2";
import { Card } from "components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip
);

interface WeatherChartProps {
  type: "bar" | "line";
  title: string;
  data: {
    labels: string[];
    datasets: { label: string; data: any }[];
  };
  yMin?: number;
  yMax?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function WeatherChart(props: WeatherChartProps) {
  let Chart = null;

  if (props.type === "bar") {
    Chart = Bar;
  } else if (props.type === "line") {
    Chart = Line;
  }

  return (
    <Card className={`dashboard__card ${props.className}`} style={props.style}>
      <Card.Title align="start" className="dashboard__card-title">
        {props.title}
      </Card.Title>
      <Card.Content className="dashboard__weather-chart">
        {Chart ? (
          <Chart
            options={{
              aspectRatio: 3,
              responsive: true,
              scales: {
                x: {
                  ticks: {
                    autoSkip: false,
                  },
                },
                y: {
                  min: props.yMin || 0,
                  max: props.yMax,
                },
              },
            }}
            data={{ ...props.data }}
          />
        ) : null}
      </Card.Content>
    </Card>
  );
}
