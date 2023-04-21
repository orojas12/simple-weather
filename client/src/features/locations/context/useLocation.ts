import { useContext } from "react";
import { LocationContext } from "./LocationProvider";
import { ContextNotFoundError } from "@/context";

export function useLocation() {
  const location = useContext(LocationContext);

  if (!location) throw new ContextNotFoundError("LocationContext");

  return location;
}
