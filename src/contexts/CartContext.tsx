import { createContext, PropsWithChildren } from "react";
import useCartCalculation from "../hooks/useCartCalculation";
import useCartCheck, { CartItemCheckType } from "../hooks/useCartCheck";
import useCartData from "../hooks/useCartData";
import { CartItemContent } from "../types/response";

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
  hasCheckedItem: boolean;

  getItemChecked: (cartId: number) => boolean;
  toggleItemChecked: (cartId: number) => void;

  cartItemCount: number;
  orderItemCount: number;

  orderQuantity: number;
  orderPrice: number;
  shippingFee: number;
  totalPrice: number;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const { cartItemsData, deleteItem, updateItemQuantity } = useCartData();
  const {
    cartItemsCheckData,
    allChecked,
    getItemChecked,
    toggleAllChecked,
    toggleItemChecked,
  } = useCartCheck(cartItemsData);

  const checkedItemsId = cartItemsCheckData
    .filter(({ checked }) => checked)
    .map(({ id }) => id);

  const { orderQuantity, orderPrice, shippingFee, totalPrice } =
    useCartCalculation(cartItemsData, checkedItemsId);

  return (
    <CartContext.Provider
      value={{
        cartItemsData,
        cartItemsCheckData,

        deleteItem,
        increaseItemQuantity: (cartId, currentQuantity) =>
          updateItemQuantity(cartId, currentQuantity + 1),
        decreaseItemQuantity: (cartId, currentQuantity) =>
          updateItemQuantity(cartId, currentQuantity - 1),

        allChecked,
        toggleAllChecked,
        hasCheckedItem: checkedItemsId.length > 0,

        getItemChecked,
        toggleItemChecked,

        cartItemCount: cartItemsData.length,
        orderItemCount: checkedItemsId.length,

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
