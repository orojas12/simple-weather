import React from "react";
import { NavLink } from "react-router-dom";
import { IconProps } from "@icons";
import {
  LogoIcon,
  HomeIcon,
  GpsIcon,
  LocationIcon,
  GearIcon,
  MenuIcon,
} from "@icons/ui";
import { Dropdown } from "@components";
import "./navbar.css";

function getLinkClassName({ isActive }: any) {
  return isActive
    ? "btn btn--primary navbar__link navbar__link--active"
    : "btn navbar__link";
}

function getNavLinkContentRenderer(
  Icon: React.JSXElementConstructor<IconProps>,
  text: string,
  props?: IconProps
): (state: { isActive: boolean }) => React.ReactNode {
  return function ({ isActive }) {
    return (
      <>
        <Icon
          className={`navbar__icon ${isActive && "navbar__icon--active"}`}
          {...props}
        />
        <div className="navbar__link-text">{text}</div>
      </>
    );
  };
}

export default function Navbar() {
  return (
    <div className="navbar">
      <NavLink to="/">
        <LogoIcon className="navbar__logo" />
      </NavLink>
      <nav>
        <ul className="navbar__list">
          <li>
            <NavLink to="/" className={getLinkClassName}>
              {getNavLinkContentRenderer(HomeIcon, "Dashboard", {
                style: { height: ".9em" },
              })}
            </NavLink>
          </li>
          <li>
            <NavLink to="locations" className={getLinkClassName}>
              {getNavLinkContentRenderer(GpsIcon, "Locations")}
            </NavLink>
          </li>
          <li>
            <NavLink to="map" className={getLinkClassName}>
              {getNavLinkContentRenderer(LocationIcon, "Map")}
            </NavLink>
          </li>
          <li>
            <NavLink to="settings" className={getLinkClassName}>
              {getNavLinkContentRenderer(GearIcon, "Settings")}
            </NavLink>
          </li>
        </ul>
        <Dropdown id="navbar-dropdown" className="navbar__dropdown">
          <Dropdown.Toggle className="navbar__dropdown-toggle">
            <Dropdown.ToggleIcon>
              <MenuIcon />
            </Dropdown.ToggleIcon>
          </Dropdown.Toggle>
          <Dropdown.Menu
            align="end"
            className="navbar__dropdown-menu"
            items={[
              {
                content: (
                  <NavLink to="/" className={getLinkClassName}>
                    {getNavLinkContentRenderer(HomeIcon, "Dashboard", {
                      style: { height: ".9em" },
                    })}
                  </NavLink>
                ),
              },
              {
                content: (
                  <NavLink to="locations" className={getLinkClassName}>
                    {getNavLinkContentRenderer(GpsIcon, "Locations")}
                  </NavLink>
                ),
              },
              {
                content: (
                  <NavLink to="map" className={getLinkClassName}>
                    {getNavLinkContentRenderer(LocationIcon, "Map")}
                  </NavLink>
                ),
              },
              {
                content: (
                  <NavLink to="settings" className={getLinkClassName}>
                    {getNavLinkContentRenderer(GearIcon, "Settings")}
                  </NavLink>
                ),
              },
            ]}
          />
        </Dropdown>
      </nav>
    </div>
  );
}
