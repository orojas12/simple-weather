import { renderHook, act } from "@testing-library/react";
import { useNotifications } from "../useNotifications";
import { NotificationProvider } from "../NotificationProvider";

describe("useNotifications", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test("should add and remove notifications", () => {
    const { result } = renderHook(() => useNotifications(), {
      wrapper: NotificationProvider,
    });

    expect(result.current.notifications.length).toBe(0);

    const newNotification = {
      id: "123",
      type: "success" as const,
      message: "This is a notification",
    };

    act(() => {
      result.current.addNotification(newNotification);
    });

    expect(result.current.notifications.length).toBe(1);
    expect(result.current.notifications).toContainEqual(newNotification);

    act(() => {
      result.current.dismissNotification(newNotification.id);
    });

    expect(result.current.notifications.length).toBe(0);
    expect(result.current.notifications).not.toContainEqual(newNotification);
  });

  test("should auto-dismiss notifications", () => {
    const { result } = renderHook(() => useNotifications(), {
      wrapper: NotificationProvider,
    });

    const newNotification = {
      id: "123",
      type: "success" as const,
      message: "This is a notification",
    };

    jest.spyOn(global, "setTimeout");

    act(() => {
      result.current.addNotification(newNotification, 100);
    });

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 100);
  });

  test("clears timeout on removal", () => {
    const { result } = renderHook(() => useNotifications(), {
      wrapper: NotificationProvider,
    });

    const newNotification = {
      type: "success" as const,
      message: "This is a notification",
    };

    jest.spyOn(global, "clearTimeout");

    act(() => {
      const id = result.current.addNotification(newNotification, 1000);
      result.current.dismissNotification(id);
    });

    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });

  test("clears all timeouts on unmount", () => {
    const { result, unmount } = renderHook(() => useNotifications(), {
      wrapper: NotificationProvider,
    });

    const newNotification = {
      id: "123",
      type: "success" as const,
      message: "This is a notification",
    };

    jest.spyOn(global, "clearTimeout");

    act(() => {
      result.current.addNotification(newNotification, 10000);
      result.current.addNotification(newNotification, 10000);
      result.current.addNotification(newNotification, 10000);
    });

    unmount();

    expect(clearTimeout).toHaveBeenCalledTimes(3);
  });
});
