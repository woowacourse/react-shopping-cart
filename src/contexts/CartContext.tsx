import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { deleteCartItem } from "../apis/cartItems/deleteCartItem";
import { getCartItems } from "../apis/cartItems/getCartItems";
import { patchCartItem } from "../apis/cartItems/patchCartItem";
import useErrorHandler from "../hooks/useErrorHandler";
import { CartItemWithCheck } from "../types/response";
import { cartItemSelectionStorage } from "../storages/CartItemSelectionStorage";

const INITIAL_CHECKED = false;
const FREE_SHIPPING_THRESHOLD = 100_000;
const DEFAULT_SHIPPING_FEE = 3_000;

interface CartContextType {
  cartItems: CartItemWithCheck[];
  orderItems: CartItemWithCheck[];

  deleteItem: (cartId: number) => Promise<void>;
  updateItemQuantity: (cartId: number, quantity: number) => Promise<void>;

  allChecked: boolean;
  toggleAllChecked: () => void;
  toggleItemChecked: (cartId: number) => void;

  cartItemCount: number;
  orderItemCount: number;
  hasCheckedItem: boolean;

  orderQuantity: number;
  orderPrice: number;
  shippingFee: number;
  totalPrice: number;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartItemWithCheck[]>([]);
  const [allChecked, setAllChecked] = useState(INITIAL_CHECKED);
  const { handleError } = useErrorHandler();

  const fetchData = useCallback(async () => {
    try {
      const items = await getCartItems();
      setCartItems(() =>
        items.map((item) => ({
          ...item,
          checked:
            cartItemSelectionStorage.isItemSelected(item.id) || INITIAL_CHECKED,
        }))
      );
    } catch (error) {
      handleError(error);
    }
  }, [handleError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const deleteItem = useCallback(
    async (cartId: number) => {
      try {
        await deleteCartItem(cartId);
        cartItemSelectionStorage.removeSelection(cartId);
      } catch (error) {
        handleError(error);
      }
      fetchData();
    },
    [fetchData, handleError]
  );

  const updateItemQuantity = useCallback(
    async (cartId: number, newQuantity: number) => {
      try {
        await patchCartItem({
          cartId,
          quantity: newQuantity,
        });
      } catch (error) {
        handleError(error);
      }
      fetchData();
    },
    [fetchData, handleError]
  );

  // ------------------------------------------------------------------

  const toggleAllChecked = () => {
    const newAllCheckedState = !allChecked;

    setAllChecked(newAllCheckedState);
    setCartItems((prevItems) => {
      const newItems = prevItems.map((item) => ({
        ...item,
        checked: newAllCheckedState,
      }));

      const cartIds = newItems.map(({ id }) => id);
      cartItemSelectionStorage.setAllSelections(cartIds, newAllCheckedState);

      return newItems;
    });
  };

  const toggleItemChecked = (cartId: number) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === cartId ? { ...item, checked: !item.checked } : item
      );

      const targetItem = newItems.find((item) => item.id === cartId);
      if (targetItem) {
        cartItemSelectionStorage.setSelection(cartId, targetItem.checked);
      }

      return newItems;
    });
  };

  // ------------------------------------------------------------------

  const orderItems = useMemo(
    () => cartItems.filter((item) => item.checked),
    [cartItems]
  );

  const { orderQuantity, orderPrice } = useMemo(() => {
    return orderItems.reduce(
      (acc, item) => ({
        orderQuantity: acc.orderQuantity + item.quantity,
        orderPrice: acc.orderPrice + item.quantity * item.product.price,
      }),
      { orderQuantity: 0, orderPrice: 0 }
    );
  }, [orderItems]);

  const shippingFee = useMemo(() => {
    if (orderPrice === 0) return 0;
    return orderPrice >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_SHIPPING_FEE;
  }, [orderPrice]);

  const totalPrice = orderPrice + shippingFee;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orderItems,

        deleteItem,
        updateItemQuantity,

        allChecked,
        toggleAllChecked,
        toggleItemChecked,

        cartItemCount: cartItems.length,
        orderItemCount: orderItems.length,
        hasCheckedItem: orderItems.length > 0,

        orderQuantity,
        orderPrice,
        shippingFee,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
