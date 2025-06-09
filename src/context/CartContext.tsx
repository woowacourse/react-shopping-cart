import { createContext, useContext } from 'react';
import { CartItemProps } from '../types/cartItem';
import useCartList from '../hooks/useCartList';
import useSelect from '../hooks/useSelect';
import { cartPrice } from '../utils/cartPrice';
import { CART } from '../constants/cart';
import { setLocalStorage } from '../utils/localStorage';

type CartContextType = {
  data: CartItemProps[];
  error: string;
  isLoading: boolean;
  increaseCartItem: (cartItem: CartItemProps) => void;
  decreaseCartItem: (cartItem: CartItemProps) => void;
  deleteCartItem: (cartItemId: number) => void;
  clearCart: () => void;

  selectedItems: number[];
  isAllSelected: boolean;
  handleSelectItem: (cartItemId: number) => void;
  handleSelectAllItems: () => void;

  subTotal: number;
  deliveryFee: number;
  totalBeforeDiscount: number;
  typeCount: number;
  totalCount: number;
  selectedCartItems: CartItemProps[];
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data,
    setCartList,
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

  const subTotal = cartPrice.totalPrice(data, selectedItems);
  const deliveryFee =
    subTotal >= CART.FREE_DELIVERY_THRESHOLD ? 0 : CART.DELIVERY_FEE;
  const totalBeforeDiscount = subTotal + deliveryFee;
  const typeCount = selectedItems.length;
  const totalCount = data.reduce((acc: number, curr: CartItemProps) => {
    if (selectedItems.includes(curr.id)) {
      return acc + curr?.quantity;
    }
    return acc;
  }, 0);
  const selectedCartItems = data.filter((item: CartItemProps) =>
    selectedItems.includes(item.id)
  );

  const clearCart = () => {
    const items = data.filter((item) => !selectedItems.includes(item.id));
    setCartList(items);
    setLocalStorage(
      'selectedItems',
      items.map((item) => item.id)
    );
    setLocalStorage('cartList', items);
    selectedItems.forEach((id) => {
      deleteCartItem(id);
    });
  };

  return (
    <CartContext.Provider
      value={{
        data,
        error,
        isLoading,
        increaseCartItem,
        decreaseCartItem,
        deleteCartItem,
        clearCart,

        selectedItems,
        isAllSelected,
        handleSelectItem,
        handleSelectAllItems,

        subTotal,
        deliveryFee,
        totalBeforeDiscount,
        typeCount,
        totalCount,
        selectedCartItems,
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
