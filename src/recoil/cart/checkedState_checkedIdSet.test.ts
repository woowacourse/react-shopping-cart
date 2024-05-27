import { snapshot_UNSTABLE } from "recoil";
import { checkedIdSetSelector } from "./checkedState";
import { mockCartItems } from "../mocks";

jest.mock("../../api/cartItem", () => ({ fetchCartItems: () => mockCartItems }));

it("get했을 때, 카트에 존재하지 않는 아이템 id는 제외하고 반환한다.", () => {
  const snapshot = snapshot_UNSTABLE(({ set }) => set(checkedIdSetSelector, new Set([1, 2, 4])));

  expect(snapshot.getLoadable(checkedIdSetSelector).contents).toEqual(new Set([1, 2]));
});
