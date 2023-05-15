import { useRecoilState } from 'recoil';
import { cartItemsAtom } from '../stores/cartItemsStore.ts';

type UpdateCartItemsParams = {
  itemId: number;
  itemCount: number;
};

const useUpdateCartItems = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);

  const updateCartItems = ({ itemId, itemCount }: UpdateCartItemsParams) => {
    const { [itemId]: targetItem, ...restItems } = cartItems;

    if (targetItem && itemCount <= 0) {
      setCartItems(restItems);
    }

    if (targetItem && itemCount > 0) {
      setCartItems((prev) => ({ ...prev, [itemId]: { quantity: itemCount } }));
    }
  };

  const addNewCartItem = (itemId: number) => {
    setCartItems((prev) => ({ ...prev, [itemId]: { quantity: 1 } }));
  };

  return { updateCartItems, addNewCartItem };
};

export default useUpdateCartItems;
