import { atom } from "recoil";
import mockData from "mockData.json";
import { Product } from "types/domain";
import { CART_LIST_LOCAL_STORAGE_KEY } from "constants/";

const getCartItemsFromLocalStorage = (): Product[] => {
  const item = localStorage.getItem(CART_LIST_LOCAL_STORAGE_KEY);

  try {
    return item ? JSON.parse(item) : [];
  } catch {
    console.log("로컬 스토리지에서 데이터를 파싱하지 못했습니다!");

    return [];
  }
};

const cartItems = getCartItemsFromLocalStorage();

export const productListState = atom<Product[]>({
  key: "productList",
  default: structuredClone(mockData).map((item: Product) => {
    const targetItem = cartItems.find((cartItem) => cartItem.id === item.id);
    return { ...item, quantity: targetItem ? targetItem.quantity : "0" };
  }),
});
