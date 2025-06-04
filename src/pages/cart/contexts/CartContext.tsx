import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItemType } from '@/apis/cartItems/cartItem.type';
import { getCartItems } from '@/apis/cartItems/getCartItems';
import { deleteCartItem } from '@/apis/cartItems/deleteCartItem';
import { updateCartItemQuantity } from '@/apis/cartItems/updateCartItemQuantity';

interface CartState {
  cartItems: CartItemType[];
  isLoading: boolean;
  errorMessage: string | null;
}

interface CartActions {
  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
}

type CartContextType = CartState & CartActions;

const CartContext = createContext<CartContextType | null>(null);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchCartItems = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const data = await getCartItems();
      setCartItems(data);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : '장바구니를 불러오는데 실패했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const updateItemQuantity = async (id: number, quantity: number) => {
    const originalItems = cartItems;
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
    try {
      await updateCartItemQuantity({ id, quantity });
    } catch (error) {
      setCartItems(originalItems);
      setErrorMessage(error instanceof Error ? error.message : '수량 변경에 실패했습니다.');
    }
  };

  const removeItem = async (id: number) => {
    const originalItems = cartItems;
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    try {
      await deleteCartItem(id);
    } catch (error) {
      setCartItems(originalItems);
      setErrorMessage(error instanceof Error ? error.message : '아이템 삭제에 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const value: CartContextType = {
    cartItems,
    isLoading,
    errorMessage,

    fetchCartItems,
    updateItemQuantity,
    removeItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCartContext는 CartProvider 안에서 사용해야 합니다.');
  }

  return context;
};
