import { useEffect, useState } from 'react';
import { CartItemProps } from '../types/cartItem';
import cart from '../apis/cart';

function useCartList() {
  const [cartList, setCartList] = useState<CartItemProps[]>([]);
  const [isError, setIsError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCartList();
  }, []);

  const loadCartList = async () => {
    setIsLoading(true);
    try {
      const response = await cart.getCartList();
      setCartList(response);
    } catch (error) {
      if (error instanceof Error) {
        setIsError(error.message);
      } else {
        setIsError('카드 정보를 불어오는 데 문제가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const increaseCartItem = async (cartItem: CartItemProps) => {
    try {
      await cart.increaseCartItem(cartItem);

      setCartList((prev) => {
        return prev.map((item) =>
          item.id === cartItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      });
    } catch (error) {
      if (error instanceof Error) {
        setIsError(error.message);
      } else {
        setIsError('상품의 수량을 증가시키는 데 문제가 발생했습니다.');
      }
    }
  };

  const decreaseCartItem = async (cartItem: CartItemProps) => {
    try {
      await cart.decreaseCartItem(cartItem);

      setCartList((prev) => {
        return prev.map((item) =>
          item.id === cartItem.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      });
    } catch (error) {
      if (error instanceof Error) {
        setIsError(error.message);
      } else {
        setIsError('상품의 수량을 감소시키는 데 문제가 발생했습니다.');
      }
    }
  };

  const deleteCartItem = async (cartItemId: number) => {
    try {
      await cart.deleteCartItem(cartItemId);

      setCartList((prev) => {
        return prev.filter((item) => item.id !== cartItemId);
      });
    } catch (error) {
      if (error instanceof Error) {
        setIsError(error.message);
      } else {
        setIsError('상품을 삭제하는 데 문제가 발생했습니다.');
      }
    }
  };

  return {
    cartList,
    isError,
    isLoading,
    increaseCartItem,
    decreaseCartItem,
    deleteCartItem,
  };
}

export default useCartList;
