import { useContext } from "react";
import { ContextNotFoundError, LocationContext } from "@context";

export default function useLocation() {
  const location = useContext(LocationContext);

  if (!location) throw new ContextNotFoundError("LocationContext");

  return location;
}
