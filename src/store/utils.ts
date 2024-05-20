import { LOCAL_STORAGE_KEY } from "../constants";
import { getStorage, setStorage } from "./localStorage/localStorage";

export const API_TOKEN = `Basic ${btoa(
  `${import.meta.env.VITE_API_USER_ID}:${import.meta.env.VITE_API_USER_PASSWORD}`
)}`;

export const setCartItemCheckedStateInStorage = (id: number, isCheck: boolean) => {
  const localData = getStorage(LOCAL_STORAGE_KEY);
  const newData = { ...localData, [id]: isCheck };
  setStorage(LOCAL_STORAGE_KEY, newData);
};

export const deleteCartItemCheckedStateInStorage = (id: number) => {
  const localData = getStorage(LOCAL_STORAGE_KEY);
  delete localData[id];
  setStorage(LOCAL_STORAGE_KEY, localData);
};
