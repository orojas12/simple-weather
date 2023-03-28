import { useContext } from "react";

import { ContextNotFoundError, SettingsContext } from "context";

export default function useSettings() {
  const settings = useContext(SettingsContext);

  if (!settings) throw new ContextNotFoundError("SettingsContext");

  return settings;
}
