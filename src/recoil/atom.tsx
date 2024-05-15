import { atom, atomFamily } from "recoil";
import { recoilPersist } from "recoil-persist";
import { cartItemQuantitySelector } from "./selector";

const { persistAtom } = recoilPersist();

export const cartItemCheckedAtomFamily = atomFamily<boolean, number>({
  key: "cartItemCheckedState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const cartItemCheckedIdsAtom = atom<number[]>({
  key: "cartItemCheckedIds",
  default: [],
});

// export const createItemChecked = useRecoilCallback(({ set }) => (id: number, isChecked: boolean) => {
//   set(cartItemCheckedIds, (curr: number[]) => [...curr, id]);
//   set(cartItemChecked(id), isChecked);
// });

export const cartItemQuantityAtomFamily = atomFamily<number, number>({
  key: "cartItemQuantityState",
  default: cartItemQuantitySelector,
});
