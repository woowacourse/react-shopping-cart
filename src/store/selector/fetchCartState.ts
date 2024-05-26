import { selector } from "recoil";
import { getStorage, setStorage } from "../localStorage/localStorage";
import { ITEM_CHECKING_STATE_KEY } from "../../constants";
import { fetchProducts } from "../api";

export const fetchCartState = selector({
  key: "fetchCartState",
  get: async () => {
    const { content }: { content: CartItemInfo[] } = await fetchProducts();
    const localData = getStorage<CartItemCheckedStateInStorage>(ITEM_CHECKING_STATE_KEY, {});
    content.forEach((cartItem) => {
      if (localData[cartItem.id] === undefined) localData[cartItem.id] = true;
    });
    setStorage(ITEM_CHECKING_STATE_KEY, localData);
    return content;
  },
});
