import { renderHook, waitFor } from "@testing-library/react";
import { useRecoilValue } from "recoil";
import { RecoilRoot } from "recoil";
import { cartItemsState } from "./selectors";
import { mockCartItemsState } from "../../__mocks__/selectors";

describe("장바구니", () => {
  it("장바구니 데이터 로딩.", async () => {
    const { result } = renderHook(() => useRecoilValue(cartItemsState), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => {
      expect(result.current).not.toEqual([]);
    });
  });
});

describe("장바구니", () => {
  it("장바구니 데이터 로딩.", async () => {
    const { result } = renderHook(() => useRecoilValue(mockCartItemsState), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => {
      console.log(result.current);
      expect(result.current).not.toEqual([]);
    });

    expect(result.current).toEqual([
      { id: 1, name: "item1", quantity: 1 },
      { id: 2, name: "item2", quantity: 2 },
    ]);
  });
});

jest.mock("../../__mocks__/apis", () => ({
  getMockCartItems: jest.fn(),
}));

// jest.mock("../../__mocks__/apis");

describe("장바구니 테스트", () => {
  it("장바구니 데이터 로딩", async () => {
    const mockCartItems = [
      { id: 1, product: { price: 10000 }, quantity: 2 },
      { id: 2, product: { price: 20000 }, quantity: 1 },
    ];
    getMockCartItems.mockResolvedValue(mockCartItems);

    const { result } = renderHook(() => useRecoilValue(cartItemsState), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => {
      expect(result.current).toEqual(mockCartItems);
    });
  });
});
