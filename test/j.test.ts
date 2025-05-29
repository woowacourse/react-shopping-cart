import { renderHook } from "@testing-library/react";
import useCheckboxHandler from "../src/hooks/useCheckboxHandler";
import { CartItemType, ProductItemType } from "../src/types/response";
import { act } from "react";

const MOCK_PRODUCTS: ProductItemType[] = Array.from(
  { length: 20 },
  (_, index) => ({
    id: index + 1,
    name: `상품 ${index + 1}`,
    category: index % 2 === 0 ? "식료품" : "패션잡화",
    price: 1000 + index * 100,
    imageUrl:
      index % 3 === 0 ? `/images/product-${index + 1}.jpg` : "/example.png",
    quantity: index % 6 === 0 ? 0 : 5,
  })
);

const cartItems: CartItemType[] = Array.from({ length: 3 }, (_, index) => ({
  id: index + 1,
  quantity: 3,
  product: MOCK_PRODUCTS[index],
}));

describe("useCheckboxHandler", () => {
  it("마운트 직후에 모든 ID가 선택되어야 한다", () => {
    const { result } = renderHook(() => useCheckboxHandler(cartItems));

    expect(result.current.selectedCartIds).toEqual(cartItems.map((i) => i.id));
    expect(result.current.isAllSelected()).toBe(true);
    expect(result.current.isSelected(2)).toBe(true);
  });

  it("toggleAllSelect를 호출하면 전체 선택↔해제가 토글된다", () => {
    const { result } = renderHook(() => useCheckboxHandler(cartItems));

    act(() => {
      result.current.toggleAllSelect();
    });
    expect(result.current.selectedCartIds).toEqual([]);
    expect(result.current.isAllSelected()).toBe(false);

    act(() => {
      result.current.toggleAllSelect();
    });
    expect(result.current.selectedCartIds).toEqual([1, 2, 3]);
    expect(result.current.isAllSelected()).toBe(true);
  });

  it("toggleSelect를 호출하면 개별 체크박스가 토글된다", () => {
    const { result } = renderHook(() => useCheckboxHandler(cartItems));

    act(() => {
      result.current.toggleSelect(2);
    });
    expect(result.current.isSelected(2)).toBe(false);

    act(() => {
      result.current.toggleSelect(2);
    });
    expect(result.current.isSelected(2)).toBe(true);
  });

  it("cartItems가 변화하면(새 아이템 추가) selectedCartIds도 리셋된다", () => {
    const { result, rerender } = renderHook(
      (props) => useCheckboxHandler(props),
      { initialProps: cartItems }
    );

    const newItems = [...cartItems, { id: 4 }] as CartItemType[];
    rerender(newItems);

    expect(result.current.selectedCartIds).toEqual([1, 2, 3, 4]);
  });
});
