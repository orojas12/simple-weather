import React from "react";
import { Dropdown } from "components";
import { LocationIcon } from "icons";
import "./dashboard.css";

export default function DashboardPage() {
  return (
    <article className="dashboard">
      <header>
        <div className="dashboard__clock"></div>
        <Dropdown
          className="dashboard__dropdown"
          align={"start"}
          btnText={
            <div>
              <LocationIcon className="dashboard__dropdown-icon" />
              <span>Location</span>
            </div>
          }
        >
          <div className="">Location 1</div>
          <div>Location 2</div>
          <div>Location 3</div>
        </Dropdown>
      </header>
    </article>
  );
}
