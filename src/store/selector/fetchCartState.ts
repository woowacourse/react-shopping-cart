import { selector } from "recoil";
import { getStorage, setStorage } from "../localStorage/localStorage";
import { LOCAL_STORAGE_KEY } from "../../constants";
import { fetchProducts } from "../api";

export const fetchCartState = selector({
  key: "fetchCartState",
  get: async () => {
    const { content }: { content: CartItemInfo[] } = await fetchProducts("GET");
    const localData = getStorage<CartItemCheckedStateInStorage>(LOCAL_STORAGE_KEY, {});
    content.forEach((cartItem) => {
      if (localData[cartItem.id] === undefined) localData[cartItem.id] = true;
    });
    setStorage(LOCAL_STORAGE_KEY, localData);
    return content;
  },
});
