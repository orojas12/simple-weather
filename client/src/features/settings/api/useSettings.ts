import { useContext } from "react";
import { ContextNotFoundError } from "@/context";
import { SettingsContext } from "../context/SettingsProvider";

export default function useSettings() {
  const settings = useContext(SettingsContext);

  if (!settings) throw new ContextNotFoundError("SettingsContext");

  return settings;
}
