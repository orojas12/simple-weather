import React, { useContext } from "react";
import { Dropdown, Card } from "components";
import { LocationIcon } from "icons/ui";
import {
  CloudyIcon,
  PartlyCloudyIcon,
  RainyIcon,
  SnowIcon,
  ThunderstormIcon,
  SunnyIcon,
  HazeIcon,
  TornadoIcon,
  PrecipitationIcon,
} from "icons/weather";
import { LocationContext } from "hooks";
import Clock from "./Clock";
import "./dashboard.css";

export default function DashboardPage() {
  const location = useContext(LocationContext);

  return (
    <article className="dashboard">
      <header>
        <Clock />
        <Dropdown id="dropdown1" size="small">
          <Dropdown.Toggle>
            <LocationIcon className="dashboard__location-icon" />
            {location?.place?.description}
            <Dropdown.ToggleIcon />
          </Dropdown.Toggle>
          <Dropdown.Menu
            align="end"
            items={[
              {
                content: "Location 123",
                action: () => console.log("Location 123"),
              },
              {
                content: <div>Location 2</div>,
                action: () => console.log("Location 2"),
              },
              {
                content: "Location 3",
                action: () => console.log("Location 3"),
              },
            ]}
          />
        </Dropdown>
      </header>
      <main>
        <div className="dashboard__cards">
          <Card className="dashboard__card dashboard__card--active">
            <Card.Title
              align="center"
              className="dashboard__card-title dashboard__card-title--active"
            >
              Today
            </Card.Title>
            <Card.Content className="dashboard__card-content">
              <ThunderstormIcon style={{ height: "3em", width: "auto" }} />
              <span>57&deg;/45&deg;</span>
              <div className="flex align-center fs-2">
                <PrecipitationIcon
                  style={{
                    height: "1.2em",
                    width: "auto",
                    marginRight: ".3em",
                  }}
                />
                40%
              </div>
            </Card.Content>
          </Card>
          <Card className="dashboard__card">
            <Card.Title
              align="center"
              className="dashboard__card-title dashboard__card-title--active"
            >
              Today
            </Card.Title>
            <Card.Content className="dashboard__card-content">
              <ThunderstormIcon style={{ height: "3em", width: "auto" }} />
              <span>57&deg;/45&deg;</span>
              <div className="flex align-center fs-2">
                <PrecipitationIcon
                  style={{
                    height: "1.2em",
                    width: "auto",
                    marginRight: ".3em",
                  }}
                />
                40%
              </div>
            </Card.Content>
          </Card>
          <Card className="dashboard__card">
            <Card.Title
              align="center"
              className="dashboard__card-title dashboard__card-title--active"
            >
              Today
            </Card.Title>
            <Card.Content className="dashboard__card-content">
              <ThunderstormIcon style={{ height: "3em", width: "auto" }} />
              <span>57&deg;/45&deg;</span>
              <div className="flex align-center fs-2">
                <PrecipitationIcon
                  style={{
                    height: "1.2em",
                    width: "auto",
                    marginRight: ".3em",
                  }}
                />
                40%
              </div>
            </Card.Content>
          </Card>
          <Card className="dashboard__card">
            <Card.Title
              align="center"
              className="dashboard__card-title dashboard__card-title--active"
            >
              Today
            </Card.Title>
            <Card.Content className="dashboard__card-content">
              <ThunderstormIcon style={{ height: "3em", width: "auto" }} />
              <span>57&deg;/45&deg;</span>
              <div className="flex align-center fs-2">
                <PrecipitationIcon
                  style={{
                    height: "1.2em",
                    width: "auto",
                    marginRight: ".3em",
                  }}
                />
                40%
              </div>
            </Card.Content>
          </Card>
          <Card className="dashboard__card">
            <Card.Title
              align="center"
              className="dashboard__card-title dashboard__card-title--active"
            >
              Today
            </Card.Title>
            <Card.Content className="dashboard__card-content">
              <ThunderstormIcon style={{ height: "3em", width: "auto" }} />
              <span>57&deg;/45&deg;</span>
              <div className="flex align-center fs-2">
                <PrecipitationIcon
                  style={{
                    height: "1.2em",
                    width: "auto",
                    marginRight: ".3em",
                  }}
                />
                40%
              </div>
            </Card.Content>
          </Card>
          <Card className="dashboard__card">
            <Card.Title
              align="center"
              className="dashboard__card-title dashboard__card-title--active"
            >
              Today
            </Card.Title>
            <Card.Content className="dashboard__card-content">
              <ThunderstormIcon style={{ height: "3em", width: "auto" }} />
              <span>57&deg;/45&deg;</span>
              <div className="flex align-center fs-2">
                <PrecipitationIcon
                  style={{
                    height: "1.2em",
                    width: "auto",
                    marginRight: ".3em",
                  }}
                />
                40%
              </div>
            </Card.Content>
          </Card>
        </div>
      </main>
    </article>
  );
}
