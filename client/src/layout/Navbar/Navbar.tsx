import React from "react";
import { NavLink } from "react-router-dom";
import {
  IconProps,
  LogoIcon,
  HomeIcon,
  GpsIcon,
  LocationIcon,
  GearIcon,
  MenuIcon,
} from "icons";
import { Dropdown } from "components";
import "./navbar.css";

function getLinkClassName({ isActive }: any) {
  return isActive ? "navbar__link navbar__link--active" : "navbar__link";
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
              {getNavLinkContentRenderer(HomeIcon, "Dashboard")}
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
        <Dropdown
          btnText={<MenuIcon className="navbar__menu-icon" />}
          align="end"
          className="navbar__dropdown"
        >
          <ul className="navbar__dropdown-list">
            <li>
              <NavLink to="/" className={getLinkClassName}>
                {getNavLinkContentRenderer(HomeIcon, "Dashboard")}
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
        </Dropdown>
      </nav>
    </div>
  );
}
