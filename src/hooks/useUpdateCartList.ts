import { useRecoilState } from 'recoil';
import { cartListAtom } from '../stores/cartListStore.ts';
import { setCartListInLocalStorage } from '../utils/localStorageCartList.ts';
import { CartList } from '../types/CartList.ts';
import deepCopy from '../utils/deepCopy.ts';

type UpdateCartListParams = {
  itemId: number;
  value: number;
};

const useUpdateCartList = () => {
  const [cartList, setCartList] = useRecoilState(cartListAtom);

  const updateCartList = ({ itemId, value }: UpdateCartListParams) => {
    const newCartList = <CartList>deepCopy(cartList);

    if (!newCartList[itemId]) {
      newCartList[itemId] = {
        quantity: 1,
      };
    }

    if (newCartList[itemId] && value <= 0) {
      delete newCartList[itemId];
    }

    if (newCartList[itemId] && value > 0) {
      newCartList[itemId].quantity = value;
    }

    setCartListInLocalStorage(newCartList);

    setCartList(newCartList);
  };

  const increaseQuantity = (itemId: number) => {
    const item = cartList[itemId];
    if (item) {
      updateCartList({ itemId, value: item.quantity + 1 });
      return;
    }
    updateCartList({ itemId, value: 1 });
  };

  const decreaseQuantity = (itemId: number) => {
    const item = cartList[itemId];
    if (item && item.quantity > 1) {
      updateCartList({ itemId, value: item.quantity - 1 });
      return;
    }
    updateCartList({ itemId, value: 0 });
  };

  return { updateCartList, increaseQuantity, decreaseQuantity };
};

export default useUpdateCartList;
