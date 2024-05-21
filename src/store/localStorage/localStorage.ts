import { LOCAL_STORAGE_KEY } from "@/constants";

export const setCartItemsLocalStorage = (cartItems: CartItemInfo[]) => {
  const localData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "{}");
  cartItems.forEach((cartItem) => {
    if (localData[cartItem.id] === undefined) localData[cartItem.id] = true;
  });
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localData));
};

export const toggleCheck = (id: number, isCheck: boolean) => {
  const localData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "{}");
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ ...localData, [id]: isCheck }));
};

export const deleteCheck = (id: number) => {
  const localData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "{}");
  delete localData[id];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localData));
};
