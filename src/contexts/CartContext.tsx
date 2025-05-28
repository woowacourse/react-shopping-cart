import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { getCartItems } from "../apis/cartItems/getCartItems";
import { patchCartItem } from "../apis/cartItems/patchCartItem";
import { CartItemContent } from "../types/response";
import { deleteCartItem } from "../apis/cartItems/deleteCartItem";

const INITIAL_CHECKED = true;

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

  getItemChecked: (cartId: number) => boolean;
  toggleItemChecked: (cartId: number) => void;

  calculateOrderPrice: () => number;
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
  const [allChecked, setAllChecked] = useState(INITIAL_CHECKED);
  const isCheckDataInitialized = useRef(false);

  const fetchData = useCallback(async () => {
    setCartItemsData(await getCartItems());
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (cartItemsData.length > 0 && !isCheckDataInitialized.current) {
      const data = cartItemsData.map(({ id }) => ({
        id,
        checked: INITIAL_CHECKED,
      }));
      setCartItemsCheckData(data);
      isCheckDataInitialized.current = true;
    }
  }, [cartItemsData]);

  const deleteItem = useCallback(
    async (cartId: number) => {
      await deleteCartItem(cartId);
      fetchData();
      setCartItemsCheckData((prev) => prev.filter(({ id }) => id !== cartId));
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

  const toggleItemChecked = (cartId: number) => {
    setCartItemsCheckData((prev) =>
      prev.map((item) =>
        item.id === cartId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const getItemChecked = (cartId: number) => {
    return cartItemsCheckData.find(({ id }) => id === cartId)?.checked ?? false;
  };

  const calculateOrderPrice = () => {
    const checkedItemsId = cartItemsCheckData
      .filter(({ checked }) => checked)
      .map(({ id }) => id);

    return cartItemsData
      .filter(({ id }) => checkedItemsId.includes(id))
      .reduce(
        (orderPrice, cartItem) =>
          orderPrice + cartItem.quantity * cartItem.product.price,
        0
      );
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

        getItemChecked,
        toggleItemChecked,

        calculateOrderPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
