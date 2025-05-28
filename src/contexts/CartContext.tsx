import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getCartItems } from "../apis/cartItems/getCartItems";
import { patchCartItem } from "../apis/cartItems/patchCartItem";
import { CartItemContent } from "../types/response";
import { deleteCartItem } from "../apis/cartItems/deleteCartItem";

interface CartContextType {
  cartItemsData: CartItemContent[];
  cartItemsCheckData: CartItemCheckType[];

  deleteItem: (cartId: number) => Promise<void>;
  increaseItemQuantity: (
    cartId: number,
    currentQuantity: number
  ) => Promise<void>;
  decreaseItemQuantity: (
    cartId: number,
    currentQuantity: number
  ) => Promise<void>;

  allChecked: boolean;
  toggleAllChecked: () => void;
}

interface CartItemCheckType {
  id: number;
  checked: boolean;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItemsData, setCartItemsData] = useState<CartItemContent[]>([]);
  const [cartItemsCheckData, setCartItemsCheckData] = useState<
    CartItemCheckType[]
  >([]);
  const [allChecked, setAllChecked] = useState(false);

  const fetchData = useCallback(async () => {
    setCartItemsData(await getCartItems());
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const data = cartItemsData.map(({ id }) => ({ id, checked: false }));
    setCartItemsCheckData(data);
  }, [cartItemsData]);

  const deleteItem = useCallback(
    async (cartId: number) => {
      await deleteCartItem(cartId);
      fetchData();
    },
    [fetchData]
  );

  const increaseItemQuantity = useCallback(
    async (cartId: number, currentQuantity: number) => {
      await patchCartItem({
        cartId,
        quantity: currentQuantity + 1,
      });
      fetchData();
    },
    [fetchData]
  );

  const decreaseItemQuantity = useCallback(
    async (cartId: number, currentQuantity: number) => {
      await patchCartItem({
        cartId,
        quantity: currentQuantity - 1,
      });
      fetchData();
    },
    [fetchData]
  );

  const toggleAllChecked = () => {
    setAllChecked((prev) => !prev);

    setCartItemsCheckData((prev) => {
      return prev.map((checkData) => ({
        ...checkData,
        checked: !allChecked,
      }));
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItemsData,
        cartItemsCheckData,

        deleteItem,
        increaseItemQuantity,
        decreaseItemQuantity,

        allChecked,
        toggleAllChecked,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
