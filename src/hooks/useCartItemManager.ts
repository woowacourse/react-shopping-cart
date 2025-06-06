import { useSelectContext } from "../stores/SelectContext";
import updateCartItem from "../api/updateCartItem";
import { ResponseCartItem } from "../types/types";
import useSelectAction from "./useSelectAction";
import useCartAction from "./useCartAction";
import { useCartContext } from "../stores/CartContext";

interface UseCartItemManagerProps {
  cart: ResponseCartItem;
}

function useCartItemManager({ cart }: UseCartItemManagerProps) {
  const cartData = useCartContext();
  const selectState = useSelectContext();

  const {
    increaseItemQuantity,
    decreaseItemQuantity,
    setCartInfo,
    removeCartItem,
  } = useCartAction();
  const { addSelect, removeSelect } = useSelectAction();

  const isSelected =
    selectState.find((item) => item.id === cart.id)?.selected || false;

  const handleSelect = (): void => {
    if (isSelected) removeSelect({ id: cart.id });
    else addSelect({ id: cart.id });
  };

  const handleIncrease = async (): Promise<void> => {
    const newQuantity = cart.quantity + 1;

    try {
      increaseItemQuantity({ id: cart.id, quantity: newQuantity });
      await updateCartItem(cart.id, newQuantity);
    } catch (error) {
      setCartInfo({ items: cartData });
    }
  };

  const handleDecrease = async (): Promise<void> => {
    const newQuantity = cart.quantity - 1;

    try {
      if (cart.quantity === 1) {
        removeCartItem({ id: cart.id });
      } else {
        decreaseItemQuantity({ id: cart.id, quantity: newQuantity });
      }

      await updateCartItem(cart.id, newQuantity);
    } catch (error) {
      setCartInfo({ items: cartData });
    }
  };

  const handleDelete = async (): Promise<void> => {
    try {
      removeCartItem({ id: cart.id });
      removeSelect({ id: cart.id });
      updateCartItem(cart.id, 0);
    } catch (error) {
      setCartInfo({ items: cartData });
    }
  };

  return {
    isSelected,
    handleSelect,
    handleIncrease,
    handleDecrease,
    handleDelete,
  };
}

export default useCartItemManager;
