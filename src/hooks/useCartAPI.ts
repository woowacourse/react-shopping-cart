import { useCallback } from "react";
import { patchCartItem } from "../apis/cartItems/patchCartItem";
import { getCartItems } from "../apis/cartItems/getCartItems";
import { deleteCartItem } from "../apis/cartItems/deleteCartItem";
import { CartItemContent } from "../types/response";

export interface CartItemCheckType {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  checked: boolean;
}

interface UseCartAPIParams {
  setCartItemsData: React.Dispatch<React.SetStateAction<CartItemContent[]>>;
  setCartItemsCheckData: React.Dispatch<
    React.SetStateAction<CartItemCheckType[]>
  >;
  setLocalStorageCheckedItems: (checkedItemIds: number[]) => void;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  isCheckDataInitialized: React.MutableRefObject<boolean>;
}

const useCartAPI = ({
  setCartItemsData,
  setCartItemsCheckData,
  setLocalStorageCheckedItems,
  setErrorMessage,
  isCheckDataInitialized,
}: UseCartAPIParams) => {
  const fetchData = useCallback(async () => {
    try {
      const items = await getCartItems();
      setCartItemsData(items);

      if (!isCheckDataInitialized.current && items.length > 0) {
        const storedCheckedIds = localStorage.getItem("checkedItems");
        const parsedCheckedIds: number[] = storedCheckedIds
          ? JSON.parse(storedCheckedIds)
          : [];

        setCartItemsCheckData(
          items.map(({ id, quantity, product }) => ({
            id,
            quantity,
            name: product.name,
            imageUrl: product.imageUrl,
            price: product.price,
            checked: parsedCheckedIds ? parsedCheckedIds.includes(id) : true,
          }))
        );
        isCheckDataInitialized.current = true;
      } else {
        setCartItemsCheckData((prev) =>
          prev.map((item) => {
            const updated = items.find(({ id }) => id === item.id);
            return {
              ...item,
              quantity: updated?.quantity ?? item.quantity,
            };
          })
        );
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
    const storedCheckedIds = localStorage.getItem("checkedItems");
    const parsedCheckedIds: number[] = storedCheckedIds
      ? JSON.parse(storedCheckedIds)
      : [];

    const updatedCheckedIds = parsedCheckedIds.filter((id) => id !== cartId);
    setLocalStorageCheckedItems(updatedCheckedIds);
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
