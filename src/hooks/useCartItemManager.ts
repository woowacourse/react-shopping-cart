import { useSelectContext } from "../stores/SelectContext";
import updateCartItem from "../api/updateCartItem";
import { ResponseCartItem } from "../types/types";
import useSelectAction from "./useSelectAction";
import useCartAction from "./useCartAction";
import { useCartContext } from "../stores/CartContext";
import { deleteSelectInfo, setSelectedInfo } from "../domains/selectedInfo";

interface UseCartItemManagerProps {
  cart: ResponseCartItem;
}

function useCartItemManager({ cart }: UseCartItemManagerProps) {
  const cartData = useCartContext();
  const { selectedState } = useSelectContext();

  const {
    increaseItemQuantity,
    decreaseItemQuantity,
    setCartInfo,
    removeCartItem,
  } = useCartAction();
  const { addSelect, removeSelect } = useSelectAction();

  const isSelected =
    selectedState.find((item) => item.id === cart.id)?.selected || false;

  const handleSelect = (): void => {
    if (isSelected) {
      removeSelect({ id: cart.id });
      setSelectedInfo(selectedState, cart.id, false);
    } else {
      addSelect({ id: cart.id });
      setSelectedInfo(selectedState, cart.id, true);
    }
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
      deleteSelectInfo(cart.id);
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
