import { useRecoilState, useSetRecoilState } from 'recoil';
import { productIds, updateCart } from 'src/recoil/cartList';
import { Product } from 'src/types';
import useToast from './useToast';

const useProductSelect = (product: Product) => {
  const { addToast } = useToast();
  const setProductIds = useSetRecoilState(productIds);
  const [cartItem, setCartItem] = useRecoilState(updateCart(product.id));

  const onSelectItem: React.MouseEventHandler<SVGElement> = () => {
    setCartItem({ id:product.id , quantity: 1, product });
    setProductIds((prev) => [...prev, product.id]);
    addToast({id:Number(new Date()), type:"success", message:`${product.name}이(가) 장바구니에 추가됐습니다.`,show:true})
  };

  const add: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!cartItem) return;
    setCartItem({ ...cartItem, quantity: cartItem.quantity + 1 });
  };

  const remove: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!cartItem) return;

    if (cartItem.quantity === 1) {
      setProductIds((prev) => 
        prev.filter(id => id !== cartItem.id)
      );
    }
    setCartItem({ ...cartItem, quantity: cartItem.quantity - 1 });
  };

  return { currentCartItem: cartItem, remove, add, onSelectItem };
};

export default useProductSelect;
