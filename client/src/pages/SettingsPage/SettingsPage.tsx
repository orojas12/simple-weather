import React from "react";
import { Card } from "@components";
import { useSettings } from "@hooks";
import Setting from "./Setting";
import "./settings.css";

export default function SettingsPage() {
  const settings = useSettings();

  const onChange = (name: string, value: any) => {
    settings.set(name, value);
  };

  return (
    <article className="settings-page">
      <header>
        <h1>Settings</h1>
      </header>
      <main>
        <Card className="settings">
          <Card.Content>
            <Setting
              label="Units"
              name="units"
              value={settings.get("units")}
              options={[
                { label: "Imperial", value: "imperial" },
                { label: "Metric", value: "metric" },
              ]}
              onChange={onChange}
            />
            <Setting
              label="Use current location"
              name="useCurrentLocation"
              value={settings.get("useCurrentLocation")}
              options={[
                { label: "True", value: true },
                { label: "False", value: false },
              ]}
              onChange={onChange}
            />
          </Card.Content>
        </Card>
      </main>
    </article>
  );
}
