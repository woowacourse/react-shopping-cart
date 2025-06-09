import { act, renderHook } from "@testing-library/react";
import { CartItemType, ProductItemType } from "../src/types/response";
import useCheckboxHandler from "../src/hooks/checkbox/useCheckboxHandler";

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

const MOCK_CART_ITEMS: CartItemType[] = Array.from(
  { length: 3 },
  (_, index) => ({
    id: index + 1,
    quantity: 3,
    product: MOCK_PRODUCTS[index],
  })
);

describe("useCheckboxHandler 내부의 장바구니 아이템 선택 로직 테스트", () => {
  it("첫 렌더링에서 selectedCartIds의 상태로 모든 장바구니 아이템의 id가 설정되고, 전체선택이 true가 된다.", () => {
    const { result } = renderHook(({ items }) => useCheckboxHandler(items), {
      initialProps: { items: MOCK_CART_ITEMS },
    });

    expect(result.current.selectedIds).toEqual([1, 2, 3]);
    expect(result.current.isAllSelected()).toBe(true);
  });

  it("전체선택을 토글하여 전체 장바구니 아이템을 선택 및 해제한다.", () => {
    const { result } = renderHook(() => useCheckboxHandler(MOCK_CART_ITEMS));

    expect(result.current.isAllSelected()).toBe(true);
    expect(result.current.selectedIds).toEqual([1, 2, 3]);

    act(() => {
      result.current.toggleAllSelect();
    });
    expect(result.current.isAllSelected()).toBe(false);
    expect(result.current.selectedIds).toEqual([]);

    act(() => {
      result.current.toggleAllSelect();
    });
    expect(result.current.isAllSelected()).toBe(true);
    expect(result.current.selectedIds).toEqual([1, 2, 3]);
  });

  it("전체선택된 상태에서 개별 아이템의 선택을 해제하면 전체선택과 해당 아이템의 선택이 해제된다.", () => {
    const { result } = renderHook(() => useCheckboxHandler(MOCK_CART_ITEMS));

    expect(result.current.isAllSelected()).toBe(true);
    expect(result.current.isSelected(1)).toBe(true);
    expect(result.current.isSelected(2)).toBe(true);
    expect(result.current.isSelected(3)).toBe(true);

    act(() => {
      result.current.toggleSelect(1);
    });
    expect(result.current.selectedIds).toEqual([2, 3]);
    expect(result.current.isAllSelected()).toBe(false);
    expect(result.current.isSelected(1)).toBe(false);
    expect(result.current.isSelected(2)).toBe(true);
    expect(result.current.isSelected(3)).toBe(true);
  });

  it("전체선택이 해제된 상태에서 모든 개별 아이템을 선택하면 전체선택이 활성화된다.", () => {
    const { result } = renderHook(() => useCheckboxHandler(MOCK_CART_ITEMS));

    act(() => {
      result.current.toggleAllSelect();
    });

    expect(result.current.isAllSelected()).toBe(false);
    expect(result.current.isSelected(1)).toBe(false);
    expect(result.current.isSelected(2)).toBe(false);
    expect(result.current.isSelected(3)).toBe(false);

    act(() => {
      result.current.toggleSelect(1);
      result.current.toggleSelect(2);
      result.current.toggleSelect(3);
    });
    expect(result.current.selectedIds).toEqual([1, 2, 3]);
    expect(result.current.isAllSelected()).toBe(true);
    expect(result.current.isSelected(1)).toBe(true);
    expect(result.current.isSelected(2)).toBe(true);
    expect(result.current.isSelected(3)).toBe(true);
  });

  it("전체선택된 상태에서 아이템을 삭제해도 전체선택이 유지되고, 해당 아이템만 선택 목록에서 제거된다.", () => {
    const { result, rerender } = renderHook(
      ({ items }) => useCheckboxHandler(items),
      {
        initialProps: { items: MOCK_CART_ITEMS },
      }
    );

    expect(result.current.isAllSelected()).toBe(true);
    expect(result.current.selectedIds).toEqual([1, 2, 3]);

    const updatedItems = MOCK_CART_ITEMS.filter((item) => item.id !== 2);
    rerender({ items: updatedItems });

    expect(result.current.isAllSelected()).toBe(true);
    expect(result.current.selectedIds).toEqual([1, 3]);
    expect(result.current.selectedIds).not.toContain(2);
  });

  it("일부 아이템이 선택된 상태에서 선택되지 않은 아이템을 삭제하면 전체선택이 활성화된다.", () => {
    const { result, rerender } = renderHook(
      ({ items }) => useCheckboxHandler(items),
      {
        initialProps: { items: MOCK_CART_ITEMS },
      }
    );

    act(() => {
      result.current.toggleSelect(2);
    });

    expect(result.current.selectedIds).toEqual([1, 3]);
    expect(result.current.isAllSelected()).toBe(false);

    const updatedItems = MOCK_CART_ITEMS.filter((item) => item.id !== 2);
    rerender({ items: updatedItems });

    expect(result.current.selectedIds).toEqual([1, 3]);
    expect(result.current.isAllSelected()).toBe(true);
  });
});
