import React from "react";
import { NavLink } from "react-router-dom";
import { AddIcon } from "@/assets/icons/ui";
import { LocationsList } from "../components";
import "./locations.css";

export default function Locations() {
  return (
    <article className="locations">
      <header>
        <h1>Manage Locations</h1>
        <NavLink to="add">
          <button className="btn btn--sm">
            <AddIcon className="locations__add" />
          </button>
        </NavLink>
      </header>
      <main>
        <LocationsList />
      </main>
    </article>
  );
}
