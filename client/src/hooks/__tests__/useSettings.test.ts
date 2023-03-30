import { renderHook, act } from "@testing-library/react";
import useSettings from "../useSettings";
import { SettingsProvider } from "@context";

describe("useSettings", () => {
  afterEach(() => {
    localStorage.clear();
  });

  test("should load settings from localStorage", () => {
    localStorage.setItem("settings", JSON.stringify({ test: "123" }));
    const { result } = renderHook(() => useSettings(), {
      wrapper: SettingsProvider,
    });
    expect(result.current.get("test")).toBe("123");
  });

  test("should load defaults if no settings in storage, and save them to storage", () => {
    const { result } = renderHook(() => useSettings(), {
      wrapper: SettingsProvider,
    });
    expect(result.current.get("units")).toBe("imperial");
    expect(result.current.get("useCurrentLocation")).toBe(false);
    expect(JSON.parse(localStorage.getItem("settings") || "")).toEqual({
      units: "imperial",
      useCurrentLocation: false,
    });
  });

  test("should set localStorage items", () => {
    const { result } = renderHook(() => useSettings(), {
      wrapper: SettingsProvider,
    });

    act(() => {
      result.current.set("units", "metric");
      result.current.set("useCurrentLocation", true);
    });

    expect(result.current.get("units")).toBe("metric");
    expect(result.current.get("useCurrentLocation")).toBe(true);
    expect(JSON.parse(localStorage.getItem("settings") || "")).toEqual({
      units: "metric",
      useCurrentLocation: true,
    });
  });
});
