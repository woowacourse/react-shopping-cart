import { atom } from "recoil";
import { cartItemsState } from "../selectors/selectors";

export const isSelectedState = atom<{ [key: number]: boolean }>({
  key: "isSelectedState",
  default: {},
  effects_UNSTABLE: [
    ({ getPromise, setSelf }) => {
      getPromise(cartItemsState).then((cartItems) => {
        const isSelected = JSON.parse(localStorage.getItem("isSelected") || "{}") as {
          [key: number]: boolean;
        };

        cartItems.forEach((cartItem) => {
          if (!Object.keys(isSelected).includes(cartItem.id.toString())) {
            isSelected[cartItem.id] = false;
          }
        });
        setSelf(isSelected);
        localStorage.setItem("isSelected", JSON.stringify(isSelected));
      });
    },
  ],
});
