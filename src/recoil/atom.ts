import { atom } from "recoil";
import { CART_LIST_LOCAL_STORAGE_KEY } from "constants/";
import { ProductType } from "types/domain";
import { Product } from "hooks/useGet";

const getCartListFromLocalStorage = (): ProductType[] => {
  try {
    const item = localStorage.getItem(CART_LIST_LOCAL_STORAGE_KEY);

    return item ? JSON.parse(item) : [];
  } catch {
    console.log("로컬 스토리지에서 데이터를 파싱하지 못했습니다!");

    return [];
  }
};

const localCartList = getCartListFromLocalStorage();

export const productListState = atom<ProductType[]>({
  key: "productList",
  default: localCartList.map((product: Product) => {
    const targetItem = localCartList.find((item) => item.id === product.id);
    const newItem: ProductType = {
      ...product,
      quantity: targetItem ? targetItem.quantity : 0,
      isChecked: true,
    };

    return newItem;
  }),
});
