import { createContext, useState, useEffect } from 'react';
import { CartItem } from '../type/cart';
import { useCartItemsContext } from './useCartItemsContext';
import { calculatePrices } from '../utils/priceCalculations';

interface SelectedCartItemsContextType {
  SelectedCartItems: CartItem[];
  addSelectedCartItem: (item: CartItem, updatedQuantity: number) => void;
  addAllCartItemsInSelected: (items: CartItem[]) => void;
  removeSelectedCartItem: (item: CartItem) => void;
  cartTypeQuantity: number;
  totalQuantity: number;
  totalPrice: number;
  deliveryFee: number;
  totalPurchasePrice: number;
  couponDiscountPrice: number;
}

export const SelectedCartItemsContext = createContext<SelectedCartItemsContextType | undefined>(undefined);

interface SelectedCartItemsProviderProps {
  children: React.ReactNode;
}

export const SelectedCartItemsProvider = ({ children }: SelectedCartItemsProviderProps) => {
  const { cartItems } = useCartItemsContext();
  const [SelectedCartItems, setSelectedCartItems] = useState<CartItem[]>([]);
  const [init, setInit] = useState(false);

  const { cartTypeQuantity, totalQuantity, totalPrice, deliveryFee, totalPurchasePrice, couponDiscountPrice } =
    calculatePrices(SelectedCartItems);

  useEffect(() => {
    if (!init && cartItems.length > 0) {
      setSelectedCartItems(cartItems);
      setInit(true);
    }
  }, [cartItems, init]);

  useEffect(() => {
    setSelectedCartItems((prev) =>
      prev.map((selectedItem) => {
        const updatedItem = cartItems.find((item) => item.id === selectedItem.id);
        return updatedItem ? updatedItem : selectedItem;
      })
    );
  }, [cartItems]);

  const addSelectedCartItem = (cartItem: CartItem) => {
    setSelectedCartItems((prevItems) => [...prevItems, cartItem]);
  };

  const removeSelectedCartItem = (cartItem: CartItem) => {
    setSelectedCartItems((prevItems) => prevItems.filter((item) => item.id !== cartItem.id));
  };

  const addAllCartItemsInSelected = (cartItems: CartItem[]) => {
    setSelectedCartItems(cartItems);
  };

  return (
    <SelectedCartItemsContext.Provider
      value={{
        SelectedCartItems,
        addSelectedCartItem,
        addAllCartItemsInSelected,
        removeSelectedCartItem,
        cartTypeQuantity,
        totalQuantity,
        totalPrice,
        deliveryFee,
        totalPurchasePrice,
        couponDiscountPrice,
      }}
    >
      {children}
    </SelectedCartItemsContext.Provider>
  );
};
