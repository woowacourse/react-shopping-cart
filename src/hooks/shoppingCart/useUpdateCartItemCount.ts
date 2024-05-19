import { fetchCartItemCount } from '@apis/shoppingCart';
import { CartItem, Sign } from '@appTypes/shoppingCart';
import { COUNTS } from '@constants/shippingCart';
import { cartItemsAtom } from '@recoil/shoppingCart';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

const useUpdateCartItemCount = ({ id, quantity }: CartItem) => {
  const setCartItems = useSetRecoilState(cartItemsAtom);
  const [errorMessage, setErrorMessage] = useState('');
  const [fetchError, setFetchError] = useState<Error | null>(null);

  const getNewQuantity = (sign: Sign) => {
    return quantity + COUNTS[sign];
  };
  /**
   * 최대 수량을 넘는 수량 변경을 시도하는지 여부
   * @param quantity :현재 수량
   * @param sign  : 수량 변경 버튼 기호
   */
  const isAttemptingToGoOverMax = (quantity: number, sign: Sign) => quantity === COUNTS.max && sign === 'plus';

  /**
   * 최소 수량을 미만의 수량 변경을 시도하는지 여부
   * @param quantity :현재 수량
   * @param sign  : 수량 변경 버튼 기호
   */
  const isAttemptingToGoUnderMin = (quantity: number, sign: Sign) => quantity === COUNTS.min && sign === 'minus';

  const validateQuantity = (quantity: number, sign: Sign) => {
    if (isAttemptingToGoOverMax(quantity, sign)) {
      setErrorMessage(COUNTS.message.max);
      return false;
    }

    if (isAttemptingToGoUnderMin(quantity, sign)) {
      setErrorMessage(COUNTS.message.min);
      return false;
    }

    setErrorMessage('');

    return true;
  };

  const updateCartItems = (newQuantity: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((prevCartItem) =>
        prevCartItem.id === id ? { ...prevCartItem, quantity: newQuantity } : { ...prevCartItem },
      ),
    );
  };

  const onUpdateCartItemCount = async (sign: Sign) => {
    if (!validateQuantity(quantity, sign)) return;

    //유효한 수량변경일 경우 fetch 및 상태 변경
    const newQuantity = getNewQuantity(sign);

    try {
      await fetchCartItemCount(id, newQuantity);
      updateCartItems(newQuantity);
      setFetchError(null);
    } catch (error) {
      if (error instanceof Error) return setFetchError(error);
      setFetchError(new Error('수량 변경 fetch 오류'));
    }
  };

  return { errorMessage, fetchError, updateCartItems, getNewQuantity, validateQuantity, onUpdateCartItemCount };
};

export default useUpdateCartItemCount;
