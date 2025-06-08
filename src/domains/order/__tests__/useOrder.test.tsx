import { renderHook, act } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { OrderProvider } from "../contexts/OrderContext";
import { useOrder } from "../hooks/useOrder";

describe("useOrder 훅 테스트", () => {
  const wrapper = ({ children }: PropsWithChildren) => (
    <OrderProvider>{children}</OrderProvider>
  );

  it("isRemoteArea의 초기값은 false이다", () => {
    const { result } = renderHook(() => useOrder(), { wrapper });
    expect(result.current.isRemoteArea).toBe(false);
  });

  it("toggleRemoteArea 호출 시 isRemoteArea 값이 반전된다", () => {
    const { result } = renderHook(() => useOrder(), { wrapper });

    expect(result.current.isRemoteArea).toBe(false);

    act(() => {
      result.current.toggleRemoteArea();
    });
    expect(result.current.isRemoteArea).toBe(true);

    act(() => {
      result.current.toggleRemoteArea();
    });
    expect(result.current.isRemoteArea).toBe(false);
  });
});
