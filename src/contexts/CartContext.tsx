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

  isRemoteArea: boolean;
  setIsRemoteArea: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CartItemCheckType {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  checked: boolean;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItemsData, setCartItemsData] = useState<CartItemContent[]>([]);
  const [cartItemsCheckData, setCartItemsCheckData] = useState<
    CartItemCheckType[]
  >([]);
  const [isRemoteArea, setIsRemoteArea] = useState(false);

  const isCheckDataInitialized = useRef(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isAllChecked = useMemo(
    () =>
      cartItemsCheckData.length > 0 &&
      cartItemsCheckData.every(({ checked }) => checked),
    [cartItemsCheckData]
  );

  const setLocalStorageCheckedItems = (checkedItemIds: number[]) => {
    localStorage.setItem("checkedItems", JSON.stringify(checkedItemIds));
  };

  const { fetchData, deleteItem, increaseItemQuantity, decreaseItemQuantity } =
    useCartAPI({
      setCartItemsData,
      setCartItemsCheckData,
      setErrorMessage,
      setLocalStorageCheckedItems,
      isCheckDataInitialized,
    });

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
    setCartItemsCheckData((prev) => {
      const updated = prev.map((item) =>
        item.id === cartId ? { ...item, checked: !item.checked } : item
      );
      const newCheckedIds = updated
        .filter(({ checked }) => checked)
        .map(({ id }) => id);
      setLocalStorageCheckedItems(newCheckedIds);
      return updated;
    });
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

        isRemoteArea,
        setIsRemoteArea,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
