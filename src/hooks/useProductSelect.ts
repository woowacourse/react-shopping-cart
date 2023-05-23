import { useRecoilState } from 'recoil';
import {
  postCartItem,
  patchCartItemQuantity,
  deleteCartItem,
} from 'api/requests';
import { useToast } from 'components/@common/Toast/hooks/useToast';
import { updateCart } from 'recoil/cartList';
import { useMutate } from './useMutate';
import { Product } from 'types';

export const useProductSelect = (product: Product) => {
  const { fetchData } = useMutate();
  const [cartItem, setCartItem] = useRecoilState(updateCart(product.id));
  const { toast } = useToast();

  const cartId = product.id;

  const onSelectItem: React.MouseEventHandler<SVGElement> = () => {
    setCartItem({ id: cartId, quantity: 1, product });
    fetchData(postCartItem({ productId: product.id }));
    toast.success('장바구니에 상품이 담겼습니다.');
  };

  const add: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!cartItem) return;

    setCartItem({ ...cartItem, quantity: cartItem.quantity + 1 });
    fetchData(
      patchCartItemQuantity(cartId, { quantity: cartItem.quantity + 1 })
    );
  };

  const remove: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!cartItem) return;

    setCartItem({ ...cartItem, quantity: cartItem.quantity - 1 });
    fetchData(
      patchCartItemQuantity(cartId, { quantity: cartItem.quantity - 1 })
    );
  };

  const onDeleteItem: React.MouseEventHandler<HTMLButtonElement> = async () => {
    if (!cartItem) return;

    setCartItem({ ...cartItem, quantity: 0 });
    fetchData(deleteCartItem(cartId));
  };

  return { currentCartItem: cartItem, remove, add, onDeleteItem, onSelectItem };
};
