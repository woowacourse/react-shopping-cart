import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import useErrorHandler from "../../../hooks/useErrorHandler";
import { cartItemSelectionStorage } from "../../../storages/CartItemSelectionStorage";
import { deleteCartItem } from "../apis/deleteCartItem";
import { getCartItems } from "../apis/getCartItems";
import { patchCartItem } from "../apis/patchCartItem";
import { CartItemWithSelection } from "../types/response";
import cartReducer from "./cartReducer";

const INITIAL_SELECTED = false;
const initialState = {
  items: [],
  allSelected: INITIAL_SELECTED,
};

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
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { handleError } = useErrorHandler();

  const fetchData = useCallback(async () => {
    try {
      const items = await getCartItems();
      const itemsWithSelection = items.map((item) => ({
        ...item,
        selected:
          cartItemSelectionStorage.isItemSelected(item.id) || INITIAL_SELECTED,
      }));

      dispatch({ type: "REPLACE_ITEMS", items: itemsWithSelection });
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

  const toggleAllSelected = () => {
    const cartIds = state.items.map(({ id }) => id);
    cartItemSelectionStorage.setAllSelections(cartIds, !state.allSelected);
    dispatch({ type: "TOGGLE_ALL_SELECTED" });
  };

  const toggleItemSelected = (cartId: number) => {
    const targetItem = state.items.find((item) => item.id === cartId);
    if (targetItem) {
      cartItemSelectionStorage.setSelection(cartId, !targetItem.selected);
    }
    dispatch({ type: "TOGGLE_ITEM_SELECTED", id: cartId });
  };

  // ------------------------------------------------------------------

  const orderItems = useMemo(
    () => state.items.filter((item) => item.selected),
    [state.items]
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
        cartItems: state.items,
        orderItems,

        deleteItem,
        updateItemQuantity,

        allSelected: state.allSelected,
        toggleAllSelected,
        toggleItemSelected,

        cartItemCount: state.items.length,
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
