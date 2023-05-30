import { cartState } from "../atoms/cartState";
import { CartType } from "../type/cart";
import { useRefreshableRecoilState } from "./useRefreshableAtom";

export function useAddCartCount() {
  const [cartsData, setCartsData] =
    useRefreshableRecoilState<CartType[]>(cartState);

  function getCount(count: number, id: number) {
    setCartsData(
      cartsData.map((cart: CartType) =>
        cart.id === id ? { ...cart, quantity: count } : cart
      )
    );
  }

  function increaseQuantity(id: number) {
    setCartsData(
      cartsData.map((cart: CartType) =>
        cart.id === id ? { ...cart, quantity: cart.quantity + 1 } : cart
      )
    );
  }

  function decreaseQuantity(id: number) {
    setCartsData(
      cartsData.map((cart: CartType) =>
        cart.id === id
          ? {
              ...cart,
              quantity: cart.quantity > 1 ? cart.quantity - 1 : cart.quantity,
            }
          : cart
      )
    );
  }

  return { cartsData, getCount, increaseQuantity, decreaseQuantity };
}
