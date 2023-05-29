import { useRecoilRefresher_UNSTABLE } from "recoil";
import {
  deleteCartProduct,
  patchProductCount,
  postCartProduct,
} from "../api/cart";
import { cartState } from "../atoms/cartState";
import { CartType } from "../type/cart";

export default function useFetch() {
  const refresh = useRecoilRefresher_UNSTABLE(cartState);

  async function addProductToCart(postData: CartType) {
    const response = await postCartProduct(postData);

    if (response.ok) {
      refresh();
    }
  }

  async function updateProductCount(cartItemId: number, quantity: number) {
    const resposne = await patchProductCount(cartItemId, quantity);

    if (resposne.ok) {
      refresh();
    }
  }

  async function removeCartProduct(cartItemId: number[]) {
    const response = await deleteCartProduct(cartItemId);

    if (response.ok) {
      refresh();
    }
  }

  return { addProductToCart, updateProductCount, removeCartProduct };
}
