import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { cartItemsState } from "../selectors/selectors";

const { persistAtom } = recoilPersist({
  key: "isSelectedState",
});

export const isSelectedState = atom<{ [key: number]: boolean }>({
  key: "isSelectedState",
  default: {},
  effects_UNSTABLE: [
    // persistAtom,

    ({ getPromise, onSet, setSelf }) => {
      console.log("hello, world");
      getPromise(cartItemsState).then((cartItems) => {
        console.log(cartItems);
        onSet((newValue, oldValue) => {
          console.log(newValue, oldValue, cartItems);
          // const newDate: { [key: number]: boolean } = {};
          // cartItemList.forEach((cartItem) => {
          //   if (Object.keys(isSelected).includes(cartItem.id.toString())) {
          //     newDate[cartItem.id] = isSelected[cartItem.id];
          //   } else {
          //     newDate[cartItem.id] = false;
          //   }
          // });
        });
      });
    },
  ],
});
