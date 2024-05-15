import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue } from 'recoil';
import { cartItemListQuery, cartItemListState } from './cartItemListSelector';
import { getCartItemList, setCartItemQuantity } from '../../apis/cartItemList/cartItemList';

const useCartListItem = () => {
  const [cartItemList, setCartItemList] = useRecoilState(cartItemListQuery);
  const v = useRecoilValue(cartItemListState);
  // const [cartItemList, setCartItemList] = useRecoilState(cartItemListState);

  // 요청 많겠지만..
  const increaseQuantity = async (targetCartItemId: number) => {
    const prevQuantity = cartItemList.find(({ cartItemId }) => targetCartItemId === cartItemId)!.quantity; // TODO: 못찾는 경우 존재
    await setCartItemQuantity(targetCartItemId, prevQuantity + 1);

    const updatedCartItemList = await getCartItemList();

    // console.log(updatedCartItemList);

    // setCartItemList();
  };

  const decreaseQuantity = async (targetCartItemId: number) => {
    const prevQuantity = cartItemList.find(({ cartItemId }) => targetCartItemId === cartItemId)!.quantity; // TODO: 못찾는 경우 존재
    if (prevQuantity === 1) return;
    await setCartItemQuantity(targetCartItemId, prevQuantity - 1);

    console.log(v);
    const updatedCartItemList = await getCartItemList();
  };

  return { increaseQuantity, decreaseQuantity };
};

export default useCartListItem;
