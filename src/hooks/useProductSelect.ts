import { useRecoilState, useSetRecoilState } from 'recoil';
import { cartIdMap, updateCart } from 'src/recoil/cartList';
import { Product } from 'src/types';

const useProductSelect = (product: Product) => {
  const setCartIdMap = useSetRecoilState(cartIdMap);
  const [cartItem, setCartItem] = useRecoilState(updateCart(product.id));

  const onSelectItem: React.MouseEventHandler<SVGElement> = () => {
    const cartId = Number(new Date());
    setCartItem({ id: cartId, quantity: 1, product });
    setCartIdMap((prev) => new Map([...prev, [product.id, cartId]]));
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
