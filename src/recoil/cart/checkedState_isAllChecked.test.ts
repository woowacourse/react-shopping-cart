import { snapshot_UNSTABLE } from "recoil";
import { checkedIdSetSelector, isAllCheckedSelector } from "./checkedState";
import { mockCartItems } from "../mocks";

jest.mock("../../api/cartItem", () => ({ fetchCartItems: () => mockCartItems }));
describe("isAllCheckedSelector 테스트", () => {
  it("전체 선택을 했을 때, 전체선택 상태는 true를 반환한다.", () => {
    const snapshot = snapshot_UNSTABLE(({ set }) => {
      set(checkedIdSetSelector, new Set([1, 2]));
      set(isAllCheckedSelector, true);
    });

    expect(snapshot.getLoadable(isAllCheckedSelector).contents).toBe(true);
  });
  it("전체 선택을 해제했을 때, 전체선택 상태는 false를 반환한다.", () => {
    const snapshot = snapshot_UNSTABLE(({ set }) => {
      set(checkedIdSetSelector, new Set([1, 2]));
      set(isAllCheckedSelector, false);
    });

    expect(snapshot.getLoadable(isAllCheckedSelector).contents).toBe(false);
  });

  it("전체 선택을 했을 때, 모든 아이템들이 선택된다.", () => {
    const snapshot = snapshot_UNSTABLE(({ set }) => set(isAllCheckedSelector, true));

    expect(snapshot.getLoadable(isAllCheckedSelector).contents).toBe(true);
    expect(snapshot.getLoadable(checkedIdSetSelector).contents).toEqual(new Set([1, 2, 3]));
  });
  it("전체 선택을 해제했을 때, 모든 아이템들이 해제된다.", () => {
    const snapshot = snapshot_UNSTABLE(({ set }) => {
      set(checkedIdSetSelector, new Set([1, 2]));
      set(isAllCheckedSelector, false);
    });

    expect(snapshot.getLoadable(checkedIdSetSelector).contents).toEqual(new Set([]));
  });

  it("전체 선택 상태에서 하나만 해제했을 때, 전체선택 상태는 false륿 반환한다.", () => {
    const snapshot = snapshot_UNSTABLE(({ set }) => {
      set(checkedIdSetSelector, new Set([1, 2, 3]));
      set(checkedIdSetSelector, new Set([1, 2]));
    });

    expect(snapshot.getLoadable(isAllCheckedSelector).contents).toBe(false);
  });
  it("마지막 하나를 체크했을 때, 전체선택 상태는 true를 반환한다.", () => {
    const snapshot = snapshot_UNSTABLE(({ set }) => {
      set(checkedIdSetSelector, new Set([1, 2]));
      set(checkedIdSetSelector, new Set([1, 2, 3]));
    });

    expect(snapshot.getLoadable(isAllCheckedSelector).contents).toBe(true);
  });
});
