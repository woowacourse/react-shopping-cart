import { useRecoilState } from 'recoil';
import { cartListAtom } from '../stores/cartListStore.ts';

type UpdateCartListParams = {
  itemId: number;
  value: number;
};

const useUpdateCartList = () => {
  const [cartList, setCartList] = useRecoilState(cartListAtom);

  const updateCartList = ({ itemId, value }: UpdateCartListParams) => {
    const { [itemId]: targetItem, ...restItems } = cartList;

    if (targetItem && value <= 0) {
      setCartList(restItems);
    }

    if (targetItem && value > 0) {
      setCartList((prev) => ({ ...prev, [itemId]: { quantity: value } }));
    }
  };

  const addCartItem = (itemId: number) => {
    setCartList((prev) => ({ ...prev, [itemId]: { quantity: 1 } }));
  };

  return { updateCartList, addCartItem };
};

export default useUpdateCartList;
