import { atom } from "recoil";
import mockData from "../mockData.json";
import { ItemType } from "../types/domain";

const getCartItems = (): ItemType[] => {
  const item = localStorage.getItem("cart");

  try {
    return item ? JSON.parse(item) : [];
  } catch {
    console.log("로컬 스토리지에서 데이터를 파싱하지 못했습니다!");

    return [];
  }
};

const cartItems = getCartItems();

export const itemsState = atom({
  key: "items",
  default: structuredClone(mockData).map((item: ItemType) => {
    const targetItem = cartItems.find((cartItem) => cartItem.id === item.id);
    return { ...item, quantity: targetItem ? targetItem.quantity : "0" };
  }),
});
