import { Card } from "components";
import React from "react";
import Setting from "./Setting";
import "./settings.css";

export default function SettingsPage() {
  return (
    <article className="settings-page">
      <header>
        <h1>Settings</h1>
      </header>
      <main>
        <Card className="settings">
          <Card.Content>
            <Setting
              name="Units"
              value="Imperial"
              values={["Imperial", "Metric"]}
              onChange={() => {}}
            />
            <Setting
              name="Use current location"
              value="True"
              values={["True", "False"]}
              onChange={() => {}}
            />
            <Setting
              name="Units"
              value="Imperial"
              values={["Imperial", "Metric"]}
              onChange={() => {}}
            />
          </Card.Content>
        </Card>
      </main>
    </article>
  );
}
