import React from "react";
import { Card } from "components";

interface WeatherDetailCardProps {
  title: string;
  content: React.ReactNode;
  icon: React.ReactNode;
  subtitle: string;
}

export default function WeatherDetailCard(props: WeatherDetailCardProps) {
  return (
    <Card className="dashboard__card">
      <Card.Title className="dashboard__card-title" align="start">
        {props.title}
      </Card.Title>
      <Card.Content className="dashboard__card-content">
        <span className="dashboard__card-text">{props.content}</span>
        {props.icon}
        <span className="dashboard__card-subtitle">{props.subtitle}</span>
      </Card.Content>
    </Card>
  );
}
