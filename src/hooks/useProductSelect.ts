import { useToast } from 'components/@common/Toast/hooks/useToast';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { cartIds, updateCart } from 'recoil/cartList';
import { Product } from 'types';

export const useProductSelect = (product: Product) => {
  const setCartIds = useSetRecoilState(cartIds);
  const [cartItem, setCartItem] = useRecoilState(updateCart(product.id));
  const { toast } = useToast();

  const onSelectItem: React.MouseEventHandler<SVGElement> = () => {
    setCartIds((prev) => [...prev, product.id]);
    setCartItem({ id: product.id, quantity: 1, product });

    toast.success('장바구니에 상품이 담겼습니다.');
  };

  const add: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!cartItem) return;
    setCartItem({ ...cartItem, quantity: cartItem.quantity + 1 });
  };

  const remove: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!cartItem) return;
    if (cartItem.quantity === 1) {
      setCartIds((prev) => prev.filter((id) => id !== product.id));
    }
    setCartItem({ ...cartItem, quantity: cartItem.quantity - 1 });
  };

  return { currentCartItem: cartItem, remove, add, onSelectItem };
};
