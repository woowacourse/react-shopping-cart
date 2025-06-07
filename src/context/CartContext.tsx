import { createContext, useContext } from 'react';
import { CartItemProps } from '../types/cartItem';
import useCartList from '../hooks/useCartList';
import useSelect from '../hooks/useSelect';
import { cartPrice } from '../utils/cartPrice';
import { CART } from '../constants/cart';

type CartContextType = {
  data: CartItemProps[];
  error: string;
  isLoading: boolean;
  increaseCartItem: (cartItem: CartItemProps) => Promise<void>;
  decreaseCartItem: (cartItem: CartItemProps) => Promise<void>;
  deleteCartItem: (cartItemId: number) => Promise<void>;

  selectedItems: number[];
  isAllSelected: boolean;
  handleSelectItem: (cartItemId: number) => void;
  handleSelectAllItems: () => void;

  totalPrice: number;
  deliveryFee: number;
  totalPriceWithDeliveryFee: number;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data,
    error,
    isLoading,
    increaseCartItem,
    decreaseCartItem,
    deleteCartItem,
  } = useCartList();
  const {
    selectedItems,
    isAllSelected,
    handleSelectItem,
    handleSelectAllItems,
  } = useSelect(data);

  const totalPrice = cartPrice.totalPrice(data, selectedItems);
  const deliveryFee =
    totalPrice >= CART.FREE_DELIVERY_THRESHOLD ? 0 : CART.DELIVERY_FEE;
  const totalPriceWithDeliveryFee = totalPrice + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        data,
        error,
        isLoading,
        increaseCartItem,
        decreaseCartItem,
        deleteCartItem,

        selectedItems,
        isAllSelected,
        handleSelectItem,
        handleSelectAllItems,

        totalPrice,
        deliveryFee,
        totalPriceWithDeliveryFee,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      'useCartListContext must be used within a CartListProvider'
    );
  }
  return context;
};
