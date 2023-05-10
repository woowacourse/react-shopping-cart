import type { OrderType } from "../types";
import { useRecoilState } from "recoil";
import { cartState } from "../recoil/state";

export default function useCart() {
  const [cart, setCart] = useRecoilState(cartState);

  const addOrder = (order: OrderType) => {
    setCart([...cart, order]);
  };

  const removeOrder = (productId: number) => {
    setCart(cart.filter((order) => order.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    const orderIndex = cart.findIndex(
      (order) => order.product.id === productId
    );
    const newCart = [...cart];
    newCart[orderIndex] = {
      ...cart[orderIndex],
      quantity,
    };

    setCart(newCart);
  };

  return [cart, addOrder, removeOrder, updateQuantity] as const;
}
