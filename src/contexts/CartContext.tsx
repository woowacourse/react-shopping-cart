import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CartItemContent } from "../types/response";
import useCartAPI from "../hooks/useCartAPI";

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

  isAllChecked: boolean;
  toggleAllChecked: () => void;
  hasCheckedItem: () => boolean;

  checkedItemsId: number[];

  getItemChecked: (cartId: number) => boolean;
  toggleItemChecked: (cartId: number) => void;

  cartItemCount: number;
  orderItemCount: number;

  errorMessage: string;
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
  const isCheckDataInitialized = useRef(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isAllChecked = useMemo(
    () =>
      cartItemsCheckData.length > 0 &&
      cartItemsCheckData.every(({ checked }) => checked),
    [cartItemsCheckData]
  );

  const { fetchData, deleteItem, increaseItemQuantity, decreaseItemQuantity } =
    useCartAPI({
      setCartItemsData,
      setCartItemsCheckData,
      setErrorMessage,
      isCheckDataInitialized,
    });

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

  const toggleAllChecked = () => {
    setCartItemsCheckData((prev) =>
      prev.map((item) => ({
        ...item,
        checked: !isAllChecked,
      }))
    );
  };

  const hasCheckedItem = () => {
    return cartItemsCheckData.some(({ checked }) => checked);
  };

  const getItemChecked = (cartId: number) => {
    return cartItemsCheckData.find(({ id }) => id === cartId)?.checked ?? false;
  };

  const toggleItemChecked = (cartId: number) => {
    setCartItemsCheckData((prev) =>
      prev.map((item) =>
        item.id === cartId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const checkedItemsId = cartItemsCheckData
    .filter(({ checked }) => checked)
    .map(({ id }) => id);

  return (
    <CartContext.Provider
      value={{
        cartItemsData,
        cartItemsCheckData,

        deleteItem,
        increaseItemQuantity,
        decreaseItemQuantity,

        isAllChecked,
        toggleAllChecked,
        hasCheckedItem,

        getItemChecked,
        toggleItemChecked,

        cartItemCount: cartItemsData.length,
        orderItemCount: checkedItemsId.length,

        checkedItemsId,
        errorMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
