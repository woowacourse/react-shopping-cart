import { atom } from "recoil";
import { CART_LIST_LOCAL_STORAGE_KEY } from "constants/";
import { CartProduct } from "types/domain";

const getCartListFromLocalStorage = (): CartProduct[] => {
  try {
    const item = localStorage.getItem(CART_LIST_LOCAL_STORAGE_KEY);

    return item ? JSON.parse(item) : [];
  } catch {
    console.log("로컬 스토리지에서 데이터를 파싱하지 못했습니다!");

    return [];
  }
};

const localCartList = getCartListFromLocalStorage();

export const productListState = atom<CartProduct[]>({
  key: "productList",
  default: localCartList.map((cartItem) => {
    const targetItem = localCartList.find((item) => item.id === cartItem.id);
    const newItem: CartProduct = {
      id: cartItem.id,
      product: cartItem.product,
      quantity: targetItem ? targetItem.quantity : 0,
      isChecked: targetItem ? targetItem.isChecked : true,
    };

    return newItem;
  }),
});
