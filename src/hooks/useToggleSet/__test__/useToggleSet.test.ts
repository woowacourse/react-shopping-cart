import { renderHook } from "@testing-library/react";
import { act } from "react";
import { useToggleSet } from "..";

describe("useToggleSet", () => {
  it("인자로 제공된 초기 리스트로 set을 초기화된다", () => {
    const { result } = renderHook(() => useToggleSet<number>([1, 2, 3]));

    const [newItems] = result.current;

    expect(newItems.has(1)).toBe(true);
    expect(newItems.has(2)).toBe(true);
    expect(newItems.has(3)).toBe(true);
    expect(newItems.size).toBe(3);
  });

  it("toggleItem 함수를 사용하여 새로운 아이템을 추가할 수 있다", () => {
    const { result } = renderHook(() => useToggleSet<number>([1, 2, 3]));
    const [items, toggleItem] = result.current;

    const NEW_ITEM = 4;
    const INITIAL_SIZE = items.size;

    act(() => {
      toggleItem(NEW_ITEM);
    });

    const [newItems] = result.current;

    expect(newItems.has(NEW_ITEM)).toBe(true);
    expect(newItems.size).toBe(INITIAL_SIZE + 1);
  });

  it("toggleItem 함수를 사용하여 기존 아이템을 제거할 수 있다", () => {
    const { result } = renderHook(() => useToggleSet<number>([1, 2, 3]));
    const [items, toggleItem] = result.current;

    const REMOVED_ITEM = 2;
    const INITIAL_SIZE = items.size;

    act(() => {
      toggleItem(REMOVED_ITEM);
    });

    const [newItems] = result.current;

    expect(newItems.has(REMOVED_ITEM)).toBe(false);
    expect(newItems.size).toBe(INITIAL_SIZE - 1);
  });

  it("toggleItem 사용 시 해당 아이템이 존재하지 않으면 추가하고, 존재하면 제거한다.", () => {
    const { result } = renderHook(() => useToggleSet<number>([1, 2]));
    let [items, toggleItem] = result.current;

    const TOGGLED_ITEM = 3;
    const INITIAL_SIZE = items.size;

    act(() => {
      toggleItem(TOGGLED_ITEM); // 추가
    });

    [items, toggleItem] = result.current;

    expect(items.has(TOGGLED_ITEM)).toBe(true);
    expect(items.size).toBe(INITIAL_SIZE + 1);

    act(() => {
      toggleItem(TOGGLED_ITEM); // 제거
    });

    [items, toggleItem] = result.current;

    expect(items.has(TOGGLED_ITEM)).toBe(false);
    expect(items.size).toBe(INITIAL_SIZE);
  });
});
