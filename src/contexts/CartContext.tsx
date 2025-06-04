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
import useToast from "../hooks/useToast";
import { TOAST_TYPES } from "../components/@common/Toast/type";

const INITIAL_CHECKED = true;

const FREE_SHIPPING_THRESHOLD = 100_000;
const DEFAULT_SHIPPING_FEE = 3_000;

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
  hasCheckedItem: () => boolean;

  getItemChecked: (cartId: number) => boolean;
  toggleItemChecked: (cartId: number) => void;

  cartItemCount: number;
  orderItemCount: number;

  orderQuantity: number;
  orderPrice: number;
  shippingFee: number;
  totalPrice: number;
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
  const [errorMessage, setErrorMessage] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    showToast({ message: errorMessage, type: TOAST_TYPES.ERROR });
  }, [errorMessage, showToast]);

  const handleError = useCallback((error: unknown) => {
    if (error instanceof Error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("알 수 없는 오류가 발생했습니다.");
    }
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setCartItemsData(await getCartItems());
    } catch (error) {
      handleError(error);
    }
  }, [handleError]);

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
      try {
        await deleteCartItem(cartId);
      } catch (error) {
        handleError(error);
      }
      fetchData();
      setCartItemsCheckData((prev) => prev.filter(({ id }) => id !== cartId));
    },
    [fetchData, handleError]
  );

  const increaseItemQuantity = useCallback(
    async (cartId: number, currentQuantity: number) => {
      try {
        await patchCartItem({
          cartId,
          quantity: currentQuantity + 1,
        });
      } catch (error) {
        handleError(error);
      }
      fetchData();
    },
    [fetchData, handleError]
  );

  const decreaseItemQuantity = useCallback(
    async (cartId: number, currentQuantity: number) => {
      try {
        await patchCartItem({
          cartId,
          quantity: currentQuantity - 1,
        });
      } catch (error) {
        handleError(error);
      }
      fetchData();
    },
    [fetchData, handleError]
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

  const calculateOrderQuantity = () => {
    return cartItemsData
      .filter(({ id }) => checkedItemsId.includes(id))
      .reduce(
        (orderQuantity, cartItem) => orderQuantity + cartItem.quantity,
        0
      );
  };

  const calculateOrderPrice = () => {
    return cartItemsData
      .filter(({ id }) => checkedItemsId.includes(id))
      .reduce(
        (orderPrice, cartItem) =>
          orderPrice + cartItem.quantity * cartItem.product.price,
        0
      );
  };

  const calculateShippingFee = () => {
    const orderPrice = calculateOrderPrice();
    if (orderPrice === 0) return 0;
    return orderPrice >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_SHIPPING_FEE;
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
        hasCheckedItem,

        getItemChecked,
        toggleItemChecked,

        cartItemCount: cartItemsData.length,
        orderItemCount: checkedItemsId.length,

        orderQuantity: calculateOrderQuantity(),
        orderPrice: calculateOrderPrice(),
        shippingFee: calculateShippingFee(),
        totalPrice: calculateOrderPrice() + calculateShippingFee(),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
