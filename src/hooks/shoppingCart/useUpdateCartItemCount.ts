import { fetchCartItemCount } from '@apis/shoppingCart';
import { CartItem } from '@appTypes/shoppingCart';
import { cartItemsSelector } from '@recoil/shoppingCart';
import { useSetRecoilState } from 'recoil';

const useUpdateCartItemCount = ({ id, quantity }: CartItem) => {
  const setCartItems = useSetRecoilState(cartItemsSelector);

  const onUpdateCartItemCount = async (sign: 'minus' | 'plus') => {
    const newQuantity = quantity + (sign === 'minus' && quantity ? -1 : +1);

    // TODO: 상수화 처리 필요
    if (newQuantity === 0 || newQuantity === 101) return alert('수량은 최소 1개 이상 100개 이하여야 합니다.');

    await fetchCartItemCount(id, newQuantity);

    setCartItems((prevCartItems) =>
      prevCartItems.map((prevCartItem) =>
        prevCartItem.id === id ? { ...prevCartItem, quantity: newQuantity } : { ...prevCartItem },
      ),
    );
  };

  return onUpdateCartItemCount;
};

export default useUpdateCartItemCount;
