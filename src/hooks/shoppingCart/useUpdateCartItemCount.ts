import { fetchCartItemCount } from '@apis/shoppingCart';
import { CartItem, Sign } from '@appTypes/shoppingCart';
import { COUNTS } from '@constants/shippingCart';
import { cartItemsSelector } from '@recoil/shoppingCart';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

const useUpdateCartItemCount = ({ id, quantity }: CartItem) => {
  const setCartItems = useSetRecoilState(cartItemsSelector);
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
  const isAttemptingToGoOverMax = (quantity: number, sign: Sign) => {
    const { max, message } = COUNTS;
    const isTry = quantity === max && sign === 'plus';
    if (isTry) setErrorMessage(message.max);
    return isTry;
  };

  /**
   * 최소 수량을 미만의 수량 변경을 시도하는지 여부
   * @param quantity :현재 수량
   * @param sign  : 수량 변경 버튼 기호
   */
  const isAttemptingToGoUnderMin = (quantity: number, sign: Sign) => {
    const { min, message } = COUNTS;
    const isTry = quantity === min && sign === 'minus';
    if (isTry) setErrorMessage(message.min);

    return isTry;
  };

  const validateQuantity = (quantity: number, sign: Sign) => {
    const isValidated = !(isAttemptingToGoUnderMin(quantity, sign) || isAttemptingToGoOverMax(quantity, sign));

    if (isValidated) setErrorMessage('');

    return isValidated;
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
