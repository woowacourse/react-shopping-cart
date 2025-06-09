import { createContext, useMemo, useState } from 'react';
import { CartItem } from '../../features/cart/api/types/cart';
import { Coupon } from '../../features/coupon/types/coupon';

interface CartContextType {
  cartItems: CartItem[];
  updateCartItems: (item: CartItem[]) => void;
  updateCartItemQuantity: (item: CartItem, quantity: number) => void;
  selectedCartItems: CartItem[];
  selectedCoupons: Coupon[];
  totalDiscountPrice: number;
  totalPurchasePrice: number;
  deliveryFee: number;
  updateSelectedCartItem: (item: CartItem, updatedQuantity: number) => void;
  addAllCartItemsInSelected: (items: CartItem[]) => void;
  removeSelectedCartItem: (item: CartItem) => void;
  updateSelectedCoupons: (coupons: Coupon[]) => void;
  updateTotalDiscountPrice: (totalDiscountPrice: number) => void;
  updateTotalPurchasePrice: (totalPurchasePrice: number) => void;
  updateDeliveryFee: (deliveryFee: number) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCartItems, setSelectedCartItems] = useState<CartItem[]>([]);
  const [selectedCoupons, setSelectedCoupons] = useState<Coupon[]>([]);
  const [totalDiscountPrice, setTotalDiscountPrice] = useState<number>(0);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [totalPurchasePrice, setTotalPurchasePrice] = useState<number>(0);

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

  const updateSelectedCoupons = (coupons: Coupon[]) => {
    setSelectedCoupons(coupons);
  };

  const updateTotalDiscountPrice = (totalDiscountPrice: number) => {
    setTotalDiscountPrice(totalDiscountPrice);
  };

  const updateDeliveryFee = (deliveryFee: number) => {
    setDeliveryFee(deliveryFee);
  };

  const updateTotalPurchasePrice = (totalPurchasePrice: number) => {
    setTotalPurchasePrice(totalPurchasePrice);
  };

  const value = useMemo(
    () => ({
      cartItems,
      updateCartItems,
      updateCartItemQuantity,
      selectedCartItems,
      selectedCoupons,
      totalDiscountPrice,
      deliveryFee,
      totalPurchasePrice,
      updateSelectedCartItem,
      addAllCartItemsInSelected,
      removeSelectedCartItem,
      updateSelectedCoupons,
      updateTotalDiscountPrice,
      updateTotalPurchasePrice,
      updateDeliveryFee,
    }),
    [cartItems, selectedCartItems, selectedCoupons, totalDiscountPrice, deliveryFee, totalPurchasePrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
