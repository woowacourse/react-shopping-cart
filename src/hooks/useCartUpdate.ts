import { useRecoilState } from 'recoil';
import { updateCart } from 'src/recoil/cartList';
import { Product } from 'src/types';
import useToast from './useToast';

const useCartUpdate = (product: Product) => {
  const { toast } = useToast();
  const [cartItem, setCartItem] = useRecoilState(updateCart(product.id));

  const onSelectItem: React.MouseEventHandler<SVGElement> = () => {
    setCartItem({ id: product.id, quantity: 1, product, isSelected: true });
    toast.success(`${product.name}이(가) 장바구니에 추가됐습니다.`);
  };

  const increase: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!cartItem) return;
    setCartItem({ ...cartItem, quantity: cartItem.quantity + 1 });
  };

  const decrease: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!cartItem) return;
    setCartItem({ ...cartItem, quantity: cartItem.quantity - 1 });
  };

  const deleteItem = () => {
    if (!cartItem) return;
    setCartItem({ ...cartItem, quantity: 0 });
  };

  const onChangeSelectToggle: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (!cartItem) return;
    const { checked } = event.currentTarget;

    const newItem = { ...cartItem, isSelected: checked };

    setCartItem(newItem);
  };

  const onDeleteClick: React.MouseEventHandler = () => {
    deleteItem();
  };

  return {
    currentCartItem: cartItem,
    decrease,
    increase,
    onSelectItem,
    onChangeSelectToggle,
    onDeleteClick,
  };
};

export default useCartUpdate;
