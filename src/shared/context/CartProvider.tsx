import { createContext, useMemo, useState } from 'react';
import { CartItem } from '../../features/cart/api/types/cart';
import { Coupon } from '../../features/coupon/types/coupon';

interface CartContextType {
  cartItems: CartItem[];
  updateCartItems: (item: CartItem[]) => void;
  updateCartItemQuantity: (item: CartItem, quantity: number) => void;
  selectedCartItems: CartItem[];
  updateSelectedCartItem: (item: CartItem, updatedQuantity: number) => void;
  addAllCartItemsInSelected: (items: CartItem[]) => void;
  removeSelectedCartItem: (item: CartItem) => void;
  updateSelectedCoupons: (coupons: Coupon) => void;
  selectedCoupons: Coupon[];
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCartItems, setSelectedCartItems] = useState<CartItem[]>([]);
  const [selectedCoupons, setSelectedCoupons] = useState<Coupon[]>([]);

  const updateCartItems = (cartItems: CartItem[]) => {
    setCartItems(cartItems);
  };

  const updateCartItemQuantity = (cartItem: CartItem, quantity: number) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => (item.id === cartItem.id ? { ...item, quantity } : item));
    });
  };

  const updateSelectedCartItem = (cartItem: CartItem, quantity: number) => {
    setSelectedCartItems((prevItems) => {
      const existing = prevItems.some((item) => item.id === cartItem.id);

      if (existing) {
        return prevItems.map((item) => (item.id === cartItem.id ? { ...item, quantity } : item));
      }

      return [...prevItems, cartItem];
    });
  };

  const removeSelectedCartItem = (cartItem: CartItem) => {
    setSelectedCartItems((prevItems) => {
      return prevItems.filter((item) => item.id !== cartItem.id);
    });
  };

  const addAllCartItemsInSelected = (cartItems: CartItem[]) => {
    setSelectedCartItems(cartItems);
  };

  const updateSelectedCoupons = (coupon: Coupon) => {
    setSelectedCoupons((prevItem) => {
      const existing = prevItem.some((item) => item.id === coupon.id);
      if (existing) {
        return prevItem.filter((item) => item.id !== coupon.id);
      }
      return [...prevItem, coupon];
    });
  };

  const value = useMemo(
    () => ({
      cartItems,
      updateCartItems,
      updateCartItemQuantity,
      selectedCartItems,
      selectedCoupons,
      updateSelectedCartItem,
      addAllCartItemsInSelected,
      removeSelectedCartItem,
      updateSelectedCoupons,
    }),
    [cartItems, selectedCartItems, selectedCoupons]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
