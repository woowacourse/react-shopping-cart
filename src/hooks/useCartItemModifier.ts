import { changeProductAmount, deleteProduct } from "@/api";
import { cartState, itemQuantityState } from "@/store/atom/atoms";
import { deleteCheck } from "@/store/localStorage/localStorage";
import { useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

const useCartItemModifier = (id: number) => {
  const [quantity, setQuantity] = useRecoilState(itemQuantityState);
  const setCartState = useSetRecoilState(cartState);

  const deleteProductInCart = useCallback(() => {
    setCartState((prev) => [...prev].filter((item: CartItemInfo) => item.id !== id));
  }, [id, setCartState]);

  const executeDeleteProduct = () => {
    deleteProduct(id);
    deleteProductInCart();
    deleteCheck(id);
  };

  const increaseQuantity = () => {
    changeProductAmount({ quantity: quantity[id] + 1, id });
    setQuantity((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const decreaseQuantity = () => {
    changeProductAmount({ quantity: quantity[id] - 1, id });
    if (quantity[id] === 1) {
      executeDeleteProduct();
      return;
    }
    setQuantity((prev) => ({ ...prev, [id]: prev[id] - 1 }));
  };

  return { quantity: quantity[id], increaseQuantity, decreaseQuantity, deleteProduct: executeDeleteProduct };
};

export default useCartItemModifier;
