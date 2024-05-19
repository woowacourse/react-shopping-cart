import { act, renderHook } from "@testing-library/react";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { mockCartItemsData } from "../../mocks/mockCartItemsData";
import { mockChangeCountData } from "../../mocks/mockChangeCountData";
import { mockSelectedItemsData } from "../../mocks/mockSelectedItemsData";
import { totalItemCountState, cartItemsState, isAllCheckedState, checkedItemState } from "./atoms";

describe("초기값 테스트", () => {
  it("cartItemsState(상품 목록 조회)의 초기값은 빈 배열이어야 합니다.", () => {
    const { result } = renderHook(() => useRecoilState(cartItemsState), {
      wrapper: RecoilRoot,
    });

    expect(result.current[0]).toEqual([]);
  });

  it("totalItemCountState(상품 총 수량)의 초기값은 0이어야 합니다. ", () => {
    const { result } = renderHook(() => useRecoilState(totalItemCountState), {
      wrapper: RecoilRoot,
    });

    expect(result.current[0]).toBe(0);
  });
});

describe("mockData를 이용한 테스트", () => {
  it("cartItemsState(상품 목록 조회)에 mock 데이터를 로드하면 cartItemsState의 길이가 3이어야 합니다. ", () => {
    const { result } = renderHook(() => useRecoilState(cartItemsState), {
      wrapper: RecoilRoot,
    });

    act(() => result.current[1](mockCartItemsData.content));

    expect(result.current[0].length).toBe(3);
  });

  it("checkedItemState(개병 상품 선탞)에 mock 데이터를 로드하면 선택된 상품의 수가 3개, 선택되지 않은 상품의 수가 1개이어야 합니다.", () => {
    const { result } = renderHook(() => useRecoilState(checkedItemState), {
      wrapper: RecoilRoot,
    });

    act(() => result.current[1](mockSelectedItemsData.selectedItemsState));

    const selectedCount = Object.values(result.current[0]).filter((value) => value === true).length;

    const unselectedCount = Object.values(result.current[0]).filter(
      (value) => value === false
    ).length;

    expect(selectedCount).toBe(3);
    expect(unselectedCount).toBe(1);
  });

  it("isAllCheckedState(전체 상품 선택)에 mock 데이터를 로드하면 isAllCheckedState가 false이어야 합니다. ", () => {
    const { result } = renderHook(() => useRecoilState(isAllCheckedState), {
      wrapper: RecoilRoot,
    });

    act(() => result.current[1](mockSelectedItemsData.isAllSelectedState));

    expect(result.current[0]).toBe(false);
  });

  it("cartItemsState(상품 목록 조회)에 mock 데이터를 로드하고, 특정 아이템(429)의 수량을 증가시키면 수량이 2이어야 합니다.", () => {
    const { result } = renderHook(
      () => {
        const [cartItems, setCartItems] = useRecoilState(cartItemsState);
        const totalItemCount = useRecoilValue(totalItemCountState);
        return { cartItems, setCartItems, totalItemCount };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    act(() => {
      result.current.setCartItems(
        mockChangeCountData.content.map((item) => ({
          id: item.id,
          product: {
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            imageUrl: item.product.imageUrl,
            category: item.product.category,
          },
          quantity: item.quantity,
        }))
      );
    });

    act(() => {
      result.current.setCartItems((prevItems) =>
        prevItems.map((item) => (item.id === 429 ? { ...item, quantity: item.quantity + 1 } : item))
      );
    });

    const expectedCount = result.current.cartItems.find((item) => item.id === 429);

    if (expectedCount) {
      expect(expectedCount.quantity).toBe(2);
    }
  });
});
