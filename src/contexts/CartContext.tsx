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
import { CartItemWithSelection } from "../types/response";
import { cartItemSelectionStorage } from "../storages/CartItemSelectionStorage";

const INITIAL_SELECTED = false;
const FREE_SHIPPING_THRESHOLD = 100_000;
const DEFAULT_SHIPPING_FEE = 3_000;

interface CartContextType {
  cartItems: CartItemWithSelection[];
  orderItems: CartItemWithSelection[];

  deleteItem: (cartId: number) => Promise<void>;
  updateItemQuantity: (cartId: number, quantity: number) => Promise<void>;

  allSelected: boolean;
  toggleAllSelected: () => void;
  toggleItemSelected: (cartId: number) => void;

  cartItemCount: number;
  orderItemCount: number;
  hasSelectedItem: boolean;

  orderQuantity: number;
  orderPrice: number;
  shippingFee: number;
  totalPrice: number;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartItemWithSelection[]>([]);
  const [allSelected, setAllSelected] = useState(INITIAL_SELECTED);
  const { handleError } = useErrorHandler();

  const fetchData = useCallback(async () => {
    try {
      const items = await getCartItems();
      const itemsWithSelection = items.map((item) => ({
        ...item,
        selected:
          cartItemSelectionStorage.isItemSelected(item.id) || INITIAL_SELECTED,
      }));

      setCartItems(itemsWithSelection);

      if (itemsWithSelection.length > 0) {
        const isAllSelected = itemsWithSelection.every((item) => item.selected);
        setAllSelected(isAllSelected);
      }
    } catch (error) {
      handleError(error);
    }
  }, [handleError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (cartItems.length === 0) {
      setAllSelected(false);
      return;
    }

    const isAllSelected = cartItems.every((item) => item.selected);
    setAllSelected(isAllSelected);
  }, [cartItems]);

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

  const toggleAllSelected = () => {
    const newAllSelectedState = !allSelected;

    setAllSelected(newAllSelectedState);
    setCartItems((prevItems) => {
      const newItems = prevItems.map((item) => ({
        ...item,
        selected: newAllSelectedState,
      }));

      const cartIds = newItems.map(({ id }) => id);
      cartItemSelectionStorage.setAllSelections(cartIds, newAllSelectedState);

      return newItems;
    });
  };

  const toggleItemSelected = (cartId: number) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === cartId ? { ...item, selected: !item.selected } : item
      );

      const targetItem = newItems.find((item) => item.id === cartId);
      if (targetItem) {
        cartItemSelectionStorage.setSelection(cartId, targetItem.selected);
      }

      return newItems;
    });
  };

  // ------------------------------------------------------------------

  const orderItems = useMemo(
    () => cartItems.filter((item) => item.selected),
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

        allSelected,
        toggleAllSelected,
        toggleItemSelected,

        cartItemCount: cartItems.length,
        orderItemCount: orderItems.length,
        hasSelectedItem: orderItems.length > 0,

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
