import { renderHook, waitFor } from "@testing-library/react";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { describe, expect, it, vi } from "vitest";
import fixtures from "../fixtures";
import { fetchCartItems } from "../src/api";
import {
  cartItemQuantity,
  cartItemSelected,
  cartListState,
} from "../src/recoil/atoms";

import { CartItemType } from "../src/types";

vi.mock("../src/api", () => ({
  fetchCartItems: vi.fn(),
  initializeCartItemStorage: vi.fn(),
}));

const mockCartItems: CartItemType[] = fixtures.content;

describe("cartListState 테스트", () => {
  beforeAll(() => {
    (fetchCartItems as jest.Mock).mockResolvedValue(mockCartItems);
  });

  it("장바구니 목록을 성공적으로 불러와야 한다.", async () => {
    const { result } = renderHook(() => useRecoilValue(cartListState), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => {
      expect(result.current).toEqual(mockCartItems);
    });
  });
});

describe("cartItemQuantity 테스트", () => {
  beforeAll(() => {
    (fetchCartItems as jest.Mock).mockResolvedValue(mockCartItems);
  });

  it("장바구니 상품의 초기 수량이 올바르게 표시되어야 한다.", async () => {
    const itemId = 597;

    const { result } = renderHook(
      () => useRecoilValue(cartItemQuantity(itemId)),
      {
        wrapper: RecoilRoot,
      }
    );

    await waitFor(() => {
      expect(result.current).toEqual(
        mockCartItems.find((item) => item.id === itemId)?.quantity
      );
    });
  });

  it("장바구니 상품의 수량을 변경할 수 있어야 한다.", () => {
    const itemId = 597;
    const newQuantity = 3;

    const { result } = renderHook(
      () => {
        const quantity = useRecoilValue(cartItemQuantity(itemId));
        const setQuantity = useSetRecoilState(cartItemQuantity(itemId));
        return { quantity, setQuantity };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    expect(result.current.quantity).toEqual(
      mockCartItems.find((item) => item.id === itemId)?.quantity
    );

    act(() => {
      result.current.setQuantity(newQuantity);
    });

    expect(result.current.quantity).toEqual(newQuantity);
  });
});

import { act } from "react";
import { useRecoilState } from "recoil";
import CartItemLocalStorage, {
  KEY,
} from "../src/services/CartItemLocalStorage";

describe("cartItemSelected 테스트", () => {
  beforeEach(() => {
    window.localStorage.clear();

    CartItemLocalStorage.set(KEY, { 172: true, 373: false });
  });

  it("이미 선택된 상품은 선택 상태로 표시되어야 한다.", async () => {
    const { result } = renderHook(() => useRecoilState(cartItemSelected(172)), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => {
      expect(result.current[0]).toBe(true);
    });
  });

  it("선택되지 않은 상품은 미선택 상태로 표시되어야 한다.", async () => {
    const { result } = renderHook(() => useRecoilState(cartItemSelected(373)), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => {
      expect(result.current[0]).toBe(false);
    });
  });

  it("장바구니 상품의 선택 상태를 변경할 수 있어야 한다.", async () => {
    const { result } = renderHook(() => useRecoilState(cartItemSelected(172)), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => {
      act(() => {
        result.current[1](false);
      });

      expect(result.current[0]).toBe(false);

      act(() => {
        result.current[1](true);
      });

      expect(result.current[0]).toBe(true);
    });
  });
});
