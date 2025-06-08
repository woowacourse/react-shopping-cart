import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../utils/localstorage";

const key = "selectedCartItem";

export function setSelectedCartItemToLocalStorage(item: number[]): void {
  setLocalStorageItem(key, item);
}

export function getSelectedCartItemFromLocalStorage() {
  return getLocalStorageItem<number[]>(key);
}
