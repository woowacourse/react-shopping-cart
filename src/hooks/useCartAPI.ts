import { useCallback } from "react";
import { patchCartItem } from "../apis/cartItems/patchCartItem";
import { getCartItems } from "../apis/cartItems/getCartItems";
import { deleteCartItem } from "../apis/cartItems/deleteCartItem";
import { CartItemContent } from "../types/response";

interface CartItemCheckType {
  id: number;
  checked: boolean;
}

interface UseCartAPIParams {
  setCartItemsData: React.Dispatch<React.SetStateAction<CartItemContent[]>>;
  setCartItemsCheckData: React.Dispatch<
    React.SetStateAction<CartItemCheckType[]>
  >;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  isCheckDataInitialized: React.MutableRefObject<boolean>;
}

const useCartAPI = ({
  setCartItemsData,
  setCartItemsCheckData,
  setErrorMessage,
  isCheckDataInitialized,
}: UseCartAPIParams) => {
  const fetchData = useCallback(async () => {
    try {
      const items = await getCartItems();
      setCartItemsData(items);

      if (!isCheckDataInitialized.current && items.length > 0) {
        setCartItemsCheckData(items.map(({ id }) => ({ id, checked: true })));
        isCheckDataInitialized.current = true;
      }
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message);
    }
  }, [setCartItemsData, setCartItemsCheckData]);

  const deleteItem = async (cartId: number) => {
    try {
      await deleteCartItem(cartId);
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message);
    }
    await fetchData();
    setCartItemsCheckData((prev) => prev.filter(({ id }) => id !== cartId));
  };

  const increaseItemQuantity = async (
    cartId: number,
    currentQuantity: number
  ) => {
    try {
      await patchCartItem({ cartId, quantity: currentQuantity + 1 });
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message);
    }
    await fetchData();
  };

  const decreaseItemQuantity = async (
    cartId: number,
    currentQuantity: number
  ) => {
    try {
      await patchCartItem({ cartId, quantity: currentQuantity - 1 });
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message);
    }
    await fetchData();
  };

  return { fetchData, deleteItem, increaseItemQuantity, decreaseItemQuantity };
};

export default useCartAPI;
