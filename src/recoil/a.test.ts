import { DefaultValue, atom, selector, snapshot_UNSTABLE } from "recoil";
import { fetchCartItems } from "../api/cartItem";
import { mockCartItems } from "./mocks";

const fetchCartItemsSelector = selector({ key: "fetchCartItemsSelector", get: fetchCartItems });
const cartItemListAtom = atom({ key: "cartItemListAtom", default: fetchCartItemsSelector });
const cartIdSetSelector = selector({
  key: "cartIdSetSelector",
  get: ({ get }) => new Set(get(cartItemListAtom).map((item) => item.id)),
});
const checkedIdSetAtom = atom<Set<number>>({ key: "checkedIdListAtom", default: new Set() });

const checkedIdSetSelector = selector({
  key: "checkedIdSetSelector",
  get: ({ get }) => {
    const checkedIdSet = get(checkedIdSetAtom);
    const cartIdSet = get(cartIdSetSelector);
    return filterIn(checkedIdSet, cartIdSet);
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) return;
    const cartIdSet = get(cartIdSetSelector);
    set(checkedIdSetAtom, filterIn(newValue, cartIdSet));
  },
});

const isAllCheckedSelector = selector({
  key: "isAllCheckedSelector",
  get: ({ get }) => isEqual(get(checkedIdSetSelector), get(cartIdSetSelector)),
});

const isEqual = (aSet: Set<number>, bSet: Set<number>) =>
  aSet.size === bSet.size && [...aSet].every((num) => bSet.has(num));
const filterIn = (aSet: Set<number>, bSet: Set<number>) => new Set([...aSet].filter((num) => bSet.has(num)));

jest.mock("../api/cartItem", () => ({ fetchCartItems: () => mockCartItems }));
describe("", () => {
  it("checkedIdSet에 집합 [1,2,3]을 설정하고 값을 확인했을 때, 집합 [1,2,3] 이 반환된다.", () => {
    const snapshot = snapshot_UNSTABLE(({ set }) => set(checkedIdSetAtom, new Set([1, 2, 3])));
    expect(snapshot.getLoadable(checkedIdSetAtom).contents).toEqual(new Set([1, 2, 3]));
  });
  it("get했을 때, 카트에 존재하지 않는 아이템 id는 제외하고 반환한다.", () => {
    const snapshot = snapshot_UNSTABLE(({ set }) => set(checkedIdSetAtom, new Set([1, 2, 4])));
    expect(snapshot.getLoadable(checkedIdSetSelector).contents).toEqual(new Set([1, 2]));
  });
});
