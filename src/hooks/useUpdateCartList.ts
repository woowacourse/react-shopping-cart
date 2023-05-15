import { useRecoilState } from 'recoil';
import { cartListAtom } from '../stores/cartListStore.ts';

type UpdateCartListParams = {
  itemId: number;
  itemCount: number;
};

const useUpdateCartList = () => {
  const [cartList, setCartList] = useRecoilState(cartListAtom);

  const updateCartList = ({ itemId, itemCount }: UpdateCartListParams) => {
    const { [itemId]: targetItem, ...restItems } = cartList;

    if (targetItem && itemCount <= 0) {
      setCartList(restItems);
    }

    if (targetItem && itemCount > 0) {
      setCartList((prev) => ({ ...prev, [itemId]: { quantity: itemCount } }));
    }
  };

  const addNewCartItem = (itemId: number) => {
    setCartList((prev) => ({ ...prev, [itemId]: { quantity: 1 } }));
  };

  return { updateCartList, addNewCartItem };
};

export default useUpdateCartList;
