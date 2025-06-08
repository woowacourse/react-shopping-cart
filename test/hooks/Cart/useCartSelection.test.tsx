import { renderHook, act } from "@testing-library/react";
import { useCartSelection } from "@/hooks/Cart/useCartSelection";
import { CartItem } from "@/type/CartItem";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock data
const createMockCartItem = (id: string): CartItem => ({
  id,
  quantity: 1,
  product: {
    id: id,
    name: `Product ${id}`,
    price: 1000,
    imageUrl: "test.jpg",
    category: "test",
    quantity: 10,
  },
});

describe("useCartSelection", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("1. localStorage에 selectedCartID를 보관한다", () => {
    it("선택 상태가 localStorage에 저장되어야 한다", () => {
      const cartItems = [createMockCartItem("1"), createMockCartItem("2")];
      const { result } = renderHook(() => useCartSelection(cartItems));

      // 초기에는 전체 선택되어 있음 ["1", "2"]
      // toggleOne("1")을 하면 "1"이 제거되어 ["2"]만 남음
      act(() => {
        result.current.toggleOne("1");
      });

      const storedValue = localStorage.getItem("selectedCartIds");
      expect(storedValue).toBeTruthy();

      const parsed = JSON.parse(storedValue!);
      expect(parsed).toEqual(["2"]); // "1"을 토글했으므로 "2"만 남아야 함
      expect(result.current.selectedIds.has("1")).toBe(false);
      expect(result.current.selectedIds.has("2")).toBe(true);
    });
  });

  describe("2. 초기화 시 전체 선택이 기본값이어야 한다", () => {
    it("처음 로드 시 storage가 비어있으면 전체 선택을 해야 한다", () => {
      const cartItems = [createMockCartItem("1"), createMockCartItem("2")];
      const { result } = renderHook(() => useCartSelection(cartItems));

      expect(result.current.isAllSelected).toBe(true);
      expect(result.current.selectedIds.size).toBe(2);
      expect(result.current.selectedIds.has("1")).toBe(true);
      expect(result.current.selectedIds.has("2")).toBe(true);

      // localStorage에도 저장되어야 함
      const storedValue = localStorage.getItem("selectedCartIds");
      expect(storedValue).toBeTruthy();
      const parsed = JSON.parse(storedValue!);
      expect(parsed).toEqual(["1", "2"]);
    });

    it("빈 Set()이 저장되어 있으면 아무것도 선택하지 않은 상태를 유지해야 한다", () => {
      // 빈 값을 미리 저장 (사용자가 의도적으로 모든 선택을 해제한 상태)
      localStorage.setItem("selectedCartIds", JSON.stringify([]));

      const cartItems = [createMockCartItem("1"), createMockCartItem("2")];
      const { result } = renderHook(() => useCartSelection(cartItems));

      expect(result.current.isAllSelected).toBe(false);
      expect(result.current.selectedIds.size).toBe(0);
    });
  });

  describe("3. 장바구니 삭제 시 선택 상태 유지", () => {
    it("cartItem이 삭제되어도 해당 ID는 토글되기 전까지 선택을 기억해야 한다", () => {
      // 초기에 3개 아이템으로 시작
      const initialItems = [
        createMockCartItem("1"),
        createMockCartItem("2"),
        createMockCartItem("3"),
      ];
      const { result, rerender } = renderHook(
        ({ items }) => useCartSelection(items),
        { initialProps: { items: initialItems } }
      );

      // 처음엔 전체 선택된 상태
      expect(result.current.selectedIds.size).toBe(3);

      // item "2"를 제거 (장바구니에서 삭제)
      const itemsAfterRemoval = [
        createMockCartItem("1"),
        createMockCartItem("3"),
      ];
      rerender({ items: itemsAfterRemoval });

      // selectedIds에는 여전히 "2"가 있어야 함 (실제 토글하기 전까지)
      expect(result.current.selectedIds.has("2")).toBe(true);

      // 하지만 selectedItems에는 실제 존재하는 아이템만 포함
      expect(result.current.selectedItems.length).toBe(2);
      expect(result.current.selectedItems.map((i) => i.id)).toEqual(["1", "3"]);
    });
  });

  describe("4. isAllSelected derived state", () => {
    it("현재 보이는 cartItems가 모두 선택되어 있으면 true를 반환해야 한다", () => {
      const cartItems = [createMockCartItem("1"), createMockCartItem("2")];
      const { result } = renderHook(() => useCartSelection(cartItems));

      // 초기에는 전체 선택
      expect(result.current.isAllSelected).toBe(true);

      // 하나 해제
      act(() => {
        result.current.toggleOne("1");
      });
      expect(result.current.isAllSelected).toBe(false);

      // 다시 선택
      act(() => {
        result.current.toggleOne("1");
      });
      expect(result.current.isAllSelected).toBe(true);
    });

    it("cartItems 개수가 줄어도 보이는 것들이 모두 선택되어 있으면 true를 반환해야 한다", () => {
      const initialItems = [
        createMockCartItem("1"),
        createMockCartItem("2"),
        createMockCartItem("3"),
      ];
      const { result, rerender } = renderHook(
        ({ items }) => useCartSelection(items),
        { initialProps: { items: initialItems } }
      );

      // 처음엔 전체 선택
      expect(result.current.isAllSelected).toBe(true);

      // 하나의 아이템을 장바구니에서 제거
      const reducedItems = [createMockCartItem("1"), createMockCartItem("3")];
      rerender({ items: reducedItems });

      // 보이는 아이템들(1, 3)이 모두 선택되어 있으므로 true여야 함
      expect(result.current.isAllSelected).toBe(true);
    });

    it("빈 cartItems일 때 isAllSelected는 false여야 한다", () => {
      const { result } = renderHook(() => useCartSelection([]));
      expect(result.current.isAllSelected).toBe(false);
    });
  });

  describe("5. 빈값 저장 가능", () => {
    it("모든 선택을 해제했을 때 빈 Set을 저장할 수 있어야 한다", () => {
      const cartItems = [createMockCartItem("1"), createMockCartItem("2")];
      const { result } = renderHook(() => useCartSelection(cartItems));

      // 전체 선택 해제
      act(() => {
        result.current.toggleAll();
      });

      expect(result.current.selectedIds.size).toBe(0);
      expect(result.current.isAllSelected).toBe(false);

      // localStorage에 빈 배열이 저장되어야 함
      const storedValue = localStorage.getItem("selectedCartIds");
      expect(storedValue).toBeTruthy();
      const parsed = JSON.parse(storedValue!);
      expect(parsed).toEqual([]);
    });

    it("개별 아이템을 모두 해제해도 빈값이 저장되어야 한다", () => {
      const cartItems = [createMockCartItem("1"), createMockCartItem("2")];
      const { result } = renderHook(() => useCartSelection(cartItems));

      // 개별적으로 모두 해제
      act(() => {
        result.current.toggleOne("1");
      });
      act(() => {
        result.current.toggleOne("2");
      });

      expect(result.current.selectedIds.size).toBe(0);

      const storedValue = localStorage.getItem("selectedCartIds");
      expect(storedValue).toBeTruthy();
      const parsed = JSON.parse(storedValue!);
      expect(parsed).toEqual([]);
    });
  });

  describe("전체 선택/해제 토글", () => {
    it("전체 선택 토글이 정상 작동해야 한다", () => {
      const cartItems = [createMockCartItem("1"), createMockCartItem("2")];
      const { result } = renderHook(() => useCartSelection(cartItems));

      // 초기 상태: 전체 선택
      expect(result.current.isAllSelected).toBe(true);

      // 전체 해제
      act(() => {
        result.current.toggleAll();
      });
      expect(result.current.isAllSelected).toBe(false);
      expect(result.current.selectedIds.size).toBe(0);

      // 다시 전체 선택
      act(() => {
        result.current.toggleAll();
      });
      expect(result.current.isAllSelected).toBe(true);
      expect(result.current.selectedIds.size).toBe(2);
    });
  });

  describe("기존 선택 상태 복원", () => {
    it("localStorage에 저장된 선택 상태를 복원해야 한다", () => {
      // 미리 일부 선택 상태를 저장
      localStorage.setItem("selectedCartIds", JSON.stringify(["1", "3"]));

      const cartItems = [
        createMockCartItem("1"),
        createMockCartItem("2"),
        createMockCartItem("3"),
      ];
      const { result } = renderHook(() => useCartSelection(cartItems));

      expect(result.current.selectedIds.has("1")).toBe(true);
      expect(result.current.selectedIds.has("2")).toBe(false);
      expect(result.current.selectedIds.has("3")).toBe(true);
      expect(result.current.isAllSelected).toBe(false);
    });
  });
});

describe("useCartSelection - localStorage 클리어하지 않는 시나리오", () => {
  // 이 describe 블록에서는 localStorage.clear()를 하지 않음

  describe("연속적인 세션 간 상태 유지", () => {
    it("첫 번째 세션에서 설정한 선택 상태가 두 번째 세션에서 유지되어야 한다", () => {
      // 이 테스트만을 위해 localStorage를 초기화 (다른 테스트와 격리)
      localStorage.clear();

      // 첫 번째 세션: 일부 아이템 선택
      const firstSessionItems = [
        createMockCartItem("item1"),
        createMockCartItem("item2"),
        createMockCartItem("item3"),
      ];

      const { result: firstResult } = renderHook(() =>
        useCartSelection(firstSessionItems)
      );

      // 초기에는 전체 선택되어 있어야 함 (localStorage가 비어있었으므로)
      expect(firstResult.current.isAllSelected).toBe(true);

      // item2만 선택 해제
      act(() => {
        firstResult.current.toggleOne("item2");
      });

      expect(firstResult.current.selectedIds.has("item1")).toBe(true);
      expect(firstResult.current.selectedIds.has("item2")).toBe(false);
      expect(firstResult.current.selectedIds.has("item3")).toBe(true);

      // localStorage 확인
      const storedAfterFirst = localStorage.getItem("selectedCartIds");
      expect(JSON.parse(storedAfterFirst!)).toEqual(["item1", "item3"]);

      // 두 번째 세션: 같은 아이템들로 다시 시작
      const { result: secondResult } = renderHook(() =>
        useCartSelection(firstSessionItems)
      );

      // 첫 번째 세션의 선택 상태가 그대로 유지되어야 함
      expect(secondResult.current.selectedIds.has("item1")).toBe(true);
      expect(secondResult.current.selectedIds.has("item2")).toBe(false);
      expect(secondResult.current.selectedIds.has("item3")).toBe(true);
      expect(secondResult.current.isAllSelected).toBe(false);
    });
  });

  describe("장바구니 아이템 변경 시나리오", () => {
    it("이전 세션의 선택 상태 중 일부 아이템이 현재 장바구니에 없어도 정상 동작해야 한다", () => {
      // 이전 선택 상태: ["item1", "item3", "item5"]가 선택되어 있다고 가정
      localStorage.setItem(
        "selectedCartIds",
        JSON.stringify(["item1", "item3", "item5"])
      );

      // 현재 세션: item5는 없고, item4가 새로 추가됨
      const currentItems = [
        createMockCartItem("item1"),
        createMockCartItem("item2"),
        createMockCartItem("item3"),
        createMockCartItem("item4"),
      ];

      const { result } = renderHook(() => useCartSelection(currentItems));

      // 현재 장바구니에 있는 아이템 중 이전에 선택된 것들은 선택된 상태여야 함
      expect(result.current.selectedIds.has("item1")).toBe(true);
      expect(result.current.selectedIds.has("item2")).toBe(false);
      expect(result.current.selectedIds.has("item3")).toBe(true);
      expect(result.current.selectedIds.has("item4")).toBe(false);

      // 삭제된 item5는 selectedIds에는 여전히 있어야 함 (토글되기 전까지)
      expect(result.current.selectedIds.has("item5")).toBe(true);

      // 하지만 selectedItems에는 실제 존재하는 아이템만 포함되어야 함
      expect(result.current.selectedItems.length).toBe(2);
      expect(result.current.selectedItems.map((i) => i.id)).toEqual([
        "item1",
        "item3",
      ]);

      // isAllSelected는 현재 보이는 아이템 기준으로 계산되어야 함
      expect(result.current.isAllSelected).toBe(false); // item2, item4가 선택되지 않았으므로
    });
  });

  describe("빈 장바구니에서 아이템이 추가되는 시나리오", () => {
    it("이전에 빈 상태로 저장된 후 새 아이템이 추가되어도 빈 상태를 유지해야 한다", () => {
      // 이전에 사용자가 모든 선택을 해제한 상태
      localStorage.setItem("selectedCartIds", JSON.stringify([]));

      // 새로운 아이템들이 장바구니에 추가됨
      const newItems = [createMockCartItem("new1"), createMockCartItem("new2")];

      const { result } = renderHook(() => useCartSelection(newItems));

      // 빈 상태를 유지해야 함 (자동 전체 선택하지 않음)
      expect(result.current.selectedIds.size).toBe(0);
      expect(result.current.isAllSelected).toBe(false);
      expect(result.current.selectedItems.length).toBe(0);
    });
  });

  describe("혼합된 상태에서 토글 동작", () => {
    it("이전 선택 상태와 현재 아이템이 혼합된 상황에서 토글이 정상 작동해야 한다", () => {
      // 이전 상태: ["old1", "old3"] 선택됨
      localStorage.setItem("selectedCartIds", JSON.stringify(["old1", "old3"]));

      // 현재 아이템: old1은 여전히 있고, old3는 없고, new2가 추가됨
      const mixedItems = [
        createMockCartItem("old1"),
        createMockCartItem("new2"),
      ];

      const { result } = renderHook(() => useCartSelection(mixedItems));

      // 초기 상태 확인
      expect(result.current.selectedIds.has("old1")).toBe(true);
      expect(result.current.selectedIds.has("new2")).toBe(false);
      expect(result.current.selectedIds.has("old3")).toBe(true); // 여전히 메모리에 있음

      // new2를 선택
      act(() => {
        result.current.toggleOne("new2");
      });

      expect(result.current.selectedIds.has("old1")).toBe(true);
      expect(result.current.selectedIds.has("new2")).toBe(true);
      expect(result.current.isAllSelected).toBe(true); // 현재 보이는 모든 아이템 선택됨

      // 전체 토글 (해제)
      act(() => {
        result.current.toggleAll();
      });

      expect(result.current.selectedIds.size).toBe(0);
      expect(result.current.isAllSelected).toBe(false);

      // localStorage에도 빈 배열이 저장되어야 함
      const finalStored = localStorage.getItem("selectedCartIds");
      expect(JSON.parse(finalStored!)).toEqual([]);
    });
  });
});
