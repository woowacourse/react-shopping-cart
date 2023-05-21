import { useRecoilState } from 'recoil';
import { cartState } from '../recoil/atoms';
import { CART_BASE_URL } from '../constants';
import type { CartItem, Product } from '../types/product';
import useToast from '../components/common/Toast/useToast';

const useCartService = () => {
  const [cart, setCart] = useRecoilState(cartState);

    fetch(CART_BASE_URL, {
  const { showToast } = useToast();

  const addProductToCart = async (productId: Product['id']) => {
    const response = await fetch(CART_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productId),
    });

    if (!response.ok) {
      const { message } = await response.json();
      showToast('error', message);
    }

    showToast('success', '장바구니에 추가되었습니다.');
  };

  const updateProductQuantity = async (
    targetId: Product['id'],
    quantity: CartItem['quantity'],
  ) => {
    const response = await fetch(`${CART_BASE_URL}/${targetId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quantity),
    });

    if (!response.ok) {
      const { message } = await response.json();
      showToast('error', message);
    }

  };

  const removeProductFromCart = async (targetId: Product['id']) => {
    const response = await fetch(`${CART_BASE_URL}/${targetId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const { message } = await response.json();
      showToast('error', message);
    }

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
