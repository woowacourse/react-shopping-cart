import { createContext, useContext, useEffect, useRef, useState, PropsWithChildren } from 'react';

import { useFetchData } from '@/shared/hooks/useFetchData';
import { deleteCartItem, getCartItemList, updateCartItem } from '@/features/Cart/api/cart';
import { CartItem } from '@/features/Cart/types/Cart.types';
import { ToastContext } from '@/shared/context/ToastProvider';
import { isError } from '@/shared/utils/isError';

type CartContextType = {
  cartItems: (CartItem & { isChecked: boolean })[];
  toggleCheck: (id: number) => void;
  toggleAllCheck: () => void;
  updateQuantity: (id: number, qty: number) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
  isRemoteArea: boolean;
  toggleIsRemoteArea: () => void;
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
  const [checkedItems, setCheckedItems] = useState(new Set<number>());
  const hasInitialized = useRef(false);
  const [isRemoteArea, setIsRemoteArea] = useState(false);

  const CHECKED_KEY = 'cart-checked-map';

  useEffect(() => {
    if (cart.error && isError(cart.error)) {
      showToast('장바구니 정보를 불러올 수 없습니다.');
    }
  }, [cart.error, showToast]);

  useEffect(() => {
    if (cart.data && cart.data.length > 0 && !hasInitialized.current) {
      const stored = localStorage.getItem(CHECKED_KEY);
      const parsed: Record<number, boolean> = stored ? JSON.parse(stored) : {};

      const initialChecked = new Set<number>();
      cart.data.forEach((item) => {
        if (parsed[item.id]) {
          initialChecked.add(item.id);
        }
      });

      setCheckedItems(initialChecked);
      hasInitialized.current = true;
    }
  }, [cart.data]);

  const saveToStorage = (checkedSet: Set<number>) => {
    const map: Record<number, boolean> = {};
    checkedSet.forEach((id) => {
      map[id] = true;
    });
    localStorage.setItem(CHECKED_KEY, JSON.stringify(map));
  };

  const toggleCheck = (id: number) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      saveToStorage(newSet);
      return newSet;
    });
  };

  const toggleAllCheck = () => {
    setCheckedItems((prev) => {
      let newSet;
      if (prev.size === cart.data?.length) {
        newSet = new Set<number>();
      } else {
        newSet = new Set(cart.data?.map((item) => item.id));
      }
      saveToStorage(newSet);
      return newSet;
    });
  };

  const toggleIsRemoteArea = () => setIsRemoteArea((prev) => !prev);

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
      value={{
        cartItems,
        toggleCheck,
        toggleAllCheck,
        updateQuantity,
        removeCartItem,
        isRemoteArea,
        toggleIsRemoteArea,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
