import { fetchCartItemCount } from '@apis/shoppingCart';
import { CartItem } from '@appTypes/shoppingCart';
import { cartItemsSelector } from '@recoil/shoppingCart';
import { useSetRecoilState } from 'recoil';

const useUpdateCartItemCount = ({ id, quantity }: CartItem) => {
  const setCartItems = useSetRecoilState(cartItemsSelector);

  const getNewQuantity = (sign: 'minus' | 'plus') => {
    const newQuantity = quantity + (sign === 'minus' && quantity ? -1 : +1);

    if (newQuantity === 0) {
      alert('상품의 최소 주문 수량은 1개입니다. 상품을 삭제하시려면 삭제 버튼을 이용해 주세요.');
    }

    if (newQuantity === 101) {
      alert('상품의 최대 주문 수량은 100개입니다. 100개 이하로 주문해 주세요.');
    }

    return newQuantity;
  };

  const updateCartItems = (newQuantity: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((prevCartItem) =>
        prevCartItem.id === id ? { ...prevCartItem, quantity: newQuantity } : { ...prevCartItem },
      ),
    );
  };

  const onUpdateCartItemCount = async (sign: 'minus' | 'plus') => {
    const newQuantity = getNewQuantity(sign);

    await fetchCartItemCount(id, newQuantity);

    updateCartItems(newQuantity);
  };

  return { updateCartItems, getNewQuantity, onUpdateCartItemCount };
};

export default useUpdateCartItemCount;
