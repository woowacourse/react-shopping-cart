import { atom, selector, snapshot_UNSTABLE } from "recoil";
import { fetchCartItems } from "../api/cartItem";
import { mockCartItems } from "./mocks";
import { checkedIdSetSelector } from "./checkedState";

export const fetchCartItemsSelector = selector({ key: "fetchCartItemsSelector", get: fetchCartItems });
export const cartItemListAtom = atom({ key: "cartItemListAtom", default: fetchCartItemsSelector });
export const cartIdSetSelector = selector({
  key: "cartIdSetSelector",
  get: ({ get }) => new Set(get(cartItemListAtom).map((item) => item.id)),
});

jest.mock("../api/cartItem", () => ({ fetchCartItems: () => mockCartItems }));
describe("", () => {
  it("get했을 때, 카트에 존재하지 않는 아이템 id는 제외하고 반환한다.", () => {
    const snapshot = snapshot_UNSTABLE(({ set }) => set(checkedIdSetSelector, new Set([1, 2, 4])));
    expect(snapshot.getLoadable(checkedIdSetSelector).contents).toEqual(new Set([1, 2]));
  });
});
