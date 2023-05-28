import { useRecoilCallback, useRecoilValue } from 'recoil';
import { cartState } from '../recoil/atoms/cart';
import useToast from '../components/common/Toast/useToast';
import { CART_BASE_URL } from '../remotes/constants';
import type { CartItem, Product } from '../types/product';
import {
  addCartItem,
  fetchCartItems,
  removeCartItem,
  updateQuantity,
} from '../remotes/cart';

const useCartService = () => {
  const cart = useRecoilValue(cartState);
  const { showToast } = useToast();

  const updateCart = useRecoilCallback(({ set }) => async () => {
    const newCart = await fetchCartItems(CART_BASE_URL);

    set(cartState, newCart);
  });

  const addProductToCart = async (productId: Product['id']) => {
    try {
      await addCartItem(CART_BASE_URL, productId);
    } catch (error) {
      if (error instanceof Error) {
        showToast('error', error.message);
        return;
      }
    }

    showToast('success', '장바구니에 추가되었습니다.');
    updateCart();
  };

  const updateProductQuantity = async (
    targetId: Product['id'],
    quantity: CartItem['quantity'],
  ) => {
    try {
      await updateQuantity(`${CART_BASE_URL}/${targetId}`, quantity);
    } catch (error) {
      if (error instanceof Error) {
        showToast('error', error.message);
        return;
      }
    }

    updateCart();
  };

  const removeProductFromCart = async (targetId: Product['id']) => {
    try {
      await removeCartItem(`${CART_BASE_URL}/${targetId}`);
    } catch (error) {
      if (error instanceof Error) {
        showToast('error', error.message);
        return;
      }
    }

    updateCart();
  };

  const removeAllProductsFromCart = (targetIds: Array<Product['id']>) => {
    targetIds.forEach((id) => removeProductFromCart(id));
    showToast('success', '장바구니에서 삭제되었습니다.');
  };

  return {
    cart,
    addProductToCart,
    updateProductQuantity,
    removeProductFromCart,
    removeAllProductsFromCart,
  } as const;
};

export default useCartService;
