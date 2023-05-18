import { useToast } from 'components/@common/Toast/hooks/useToast';
import { useFetch } from './useFetch';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { cartIds, updateCart } from 'recoil/cartList';
import { Product } from 'types';

export const useProductSelect = (product: Product) => {
  const setCartIds = useSetRecoilState(cartIds);
  const [cartItem, setCartItem] = useRecoilState(updateCart(product.id));
  const { toast } = useToast();
  const { api } = useFetch();

  const cartId = product.id;

  const onSelectItem: React.MouseEventHandler<SVGElement> = () => {
    setCartIds((prev) => [...prev, cartId]);
    setCartItem({ id: cartId, quantity: 1, product });

    api.post('/api/cart-items', { productId: product.id });
    toast.success('장바구니에 상품이 담겼습니다.');
  };

  const add: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!cartItem) return;
    setCartItem({ ...cartItem, quantity: cartItem.quantity + 1 });

    api.patch(`/api/cart-items/${cartId}`, {
      quantity: cartItem.quantity + 1,
    });
  };

  const remove: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!cartItem) return;
    if (cartItem.quantity === 1) {
      setCartIds((prev) => prev.filter((id) => id !== cartId));
    }
    setCartItem({ ...cartItem, quantity: cartItem.quantity - 1 });

    api.patch(`/api/cart-items/${cartId}`, {
      quantity: cartItem.quantity - 1,
    });
  };

  const onDeleteItem: React.MouseEventHandler<HTMLButtonElement> = () => {
    api.delete(`/api/cart-items/${cartId}`);
    setCartIds((prev) => prev.filter((id) => id !== cartId));
  };

  return { currentCartItem: cartItem, remove, add, onDeleteItem, onSelectItem };
};
