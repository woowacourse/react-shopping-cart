import { useToast } from 'components/@common/Toast/hooks/useToast';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { cartIdMap, updateCart } from 'recoil/cartList';
import { Product } from 'types';

const useProductSelect = (product: Product) => {
  const setCartIdMap = useSetRecoilState(cartIdMap);
  const [cartItem, setCartItem] = useRecoilState(updateCart(product.id));
  const { toast } = useToast();

  const onSelectItem: React.MouseEventHandler<SVGElement> = () => {
    const cartId = Number(new Date());
    setCartItem({ id: cartId, quantity: 1, product });
    setCartIdMap((prev) => new Map([...prev, [product.id, cartId]]));
    toast.success('장바구니에 상품이 담겼습니다.');
  };

  const add: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!cartItem) return;
    setCartItem({ ...cartItem, quantity: cartItem.quantity + 1 });
  };

  const remove: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!cartItem) return;
    if (cartItem.quantity === 1) {
      setCartIdMap((prev) => {
        const newState = new Map(prev);
        newState.delete(product.id);
        return newState;
      });
    }
    setCartItem({ ...cartItem, quantity: cartItem.quantity - 1 });
  };

  return { currentCartItem: cartItem, remove, add, onSelectItem };
};

export default useProductSelect;
