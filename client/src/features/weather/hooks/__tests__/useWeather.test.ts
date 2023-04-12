import { renderHook } from "@testing-library/react";
import useWeather from "../useWeather";
import { WeatherProvider } from "../../providers/WeatherProvider";

jest.mock("@/hooks", () => {
  const originalModule = jest.requireActual("@/hooks");
  return {
    __esModule: true,
    ...originalModule,
    useLocation: jest.fn(() => ({
      data: { activeLocation: { lat: 0, lng: 0 } },
    })),
  };
});

describe("useWeather", () => {
  test("sets error on network connection error", () => {
    global.fetch = jest.fn(() => {
      throw new Error();
    });
    const { result } = renderHook(() => useWeather(), {
      wrapper: WeatherProvider,
    });
    expect(result.current.error instanceof Error).toBe(true);
  });

  // test("sets error on 4xx or 5xx http error", () => {
  //   global.fetch = jest.fn(() => {
  //     return { ok: false, status: 404 };
  //   }) as any;
  //   const { result } = renderHook(() => useWeather(), {
  //     wrapper: WeatherProvider,
  //   });
  //   expect(result.current.error instanceof Error).toBe(true);
  // });
});
