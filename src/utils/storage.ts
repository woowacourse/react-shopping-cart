import { ITEM_CHECKING_STATE_KEY } from "../constants";
import { getStorage, setStorage } from "../store/localStorage/localStorage";

export const API_TOKEN = `Basic ${btoa(`${process.env.VITE_API_USER_ID}:${process.env.VITE_API_USER_PASSWORD}`)}`;

export const setCartItemCheckedStateInStorage = (id: number, isCheck: boolean) => {
  const localData = getStorage<CartItemCheckedStateInStorage>(ITEM_CHECKING_STATE_KEY, {});
  const newData = { ...localData, [id]: isCheck };
  setStorage(ITEM_CHECKING_STATE_KEY, newData);
};

export const deleteCartItemCheckedStateInStorage = (id: number) => {
  const localData = getStorage<CartItemCheckedStateInStorage>(ITEM_CHECKING_STATE_KEY, {});
  delete localData[id];
  setStorage(ITEM_CHECKING_STATE_KEY, localData);
};
