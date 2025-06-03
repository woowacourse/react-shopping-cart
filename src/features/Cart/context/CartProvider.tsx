import { createContext, useContext, useEffect, useRef, useState, PropsWithChildren } from 'react';

import { useFetchData } from '@/shared/hooks/useFetchData';
import { deleteCartItem, getCartItemList, updateCartItem } from '../api/cart';
import { CartItem } from '../types/Cart.types';
import { ToastContext } from '@/shared/context/ToastProvider';
import { isError } from '@/shared/utils/isError';

type CartContextType = {
  cartItems: (CartItem & { isChecked: boolean })[];
  toggleCheck: (id: number) => void;
  toggleAllCheck: () => void;
  updateQuantity: (id: number, qty: number) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
};

const CartContext = createContext<CartContextType | null>(null);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCartContext는 CartProvider 내에서 사용해주세요.');
  return context;
};

export const CartProvider = ({ children }: PropsWithChildren) => {
  const cart = useFetchData<CartItem[]>({ autoFetch: getCartItemList });
  const { showToast } = useContext(ToastContext);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (cart.data && cart.data.length > 0 && !hasInitialized.current) {
      setCheckedItems(new Set(cart.data.map((item) => item.id)));
      hasInitialized.current = true;
    }
  }, [cart.data]);

  const toggleCheck = (id: number) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const toggleAllCheck = () => {
    setCheckedItems((prev) => {
      if (prev.size === cart.data?.length) return new Set();
      return new Set(cart.data?.map((item) => item.id));
    });
  };

  const updateQuantity = async (cartId: number, newQuantity: number) => {
    const cartItem = cart.data?.find((item) => item.id === cartId);
    try {
      await cart.mutate(() => updateCartItem({ cartId, newQuantity }), getCartItemList);
    } catch (error) {
      if (isError(error)) {
        showToast(
          `"${cartItem?.product.name}" 상품의 최대 구매 수량은 ${cartItem?.product.quantity}개 입니다.`
        );
      }
    }
  };

  const removeCartItem = async (id: number) => {
    try {
      await cart.mutate(() => deleteCartItem(id), getCartItemList);
      setCheckedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    } catch (error) {
      if (isError(error)) {
        showToast(
          `장바구니에서 ${
            cart.data?.find((item) => item.id === id)?.product.name
          } 상품을 삭제할 수 없습니다.`
        );
      }
    }
  };

  const cartItems =
    cart.data?.map((item) => ({
      ...item,
      isChecked: checkedItems.has(item.id),
    })) ?? [];

  return (
    <CartContext.Provider
      value={{ cartItems, toggleCheck, toggleAllCheck, updateQuantity, removeCartItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
