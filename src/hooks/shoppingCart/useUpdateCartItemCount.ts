import { fetchCartItemCount } from '@apis/shoppingCart';
import { CartItem } from '@appTypes/shoppingCart';
import { QUANTITY } from '@constants/shippingCart';
import { cartItemsSelector } from '@recoil/shoppingCart';
import { useSetRecoilState } from 'recoil';

const useUpdateCartItemCount = ({ id, quantity }: CartItem) => {
  const setCartItems = useSetRecoilState(cartItemsSelector);

  const getIncreasedQuantity = () => {
    const newQuantity = quantity + 1;

    if (newQuantity === QUANTITY.max + 1) {
      alert(`상품의 최대 주문 수량은 ${QUANTITY.max}개입니다. ${QUANTITY.max}개 이하로 주문해 주세요.`);
      return quantity;
    }

    return newQuantity;
  };

  const getDecreasedQuantity = () => {
    const newQuantity = quantity - 1;

    if (newQuantity === 0) {
      alert(`상품의 최소 주문 수량은 ${QUANTITY.min}개입니다. 상품을 삭제하시려면 삭제 버튼을 이용해 주세요.`);
      return quantity;
    }

    return newQuantity;
  };

  const NEW_QUANTITY_FUNCTION_MAP = {
    minus: getDecreasedQuantity,
    plus: getIncreasedQuantity,
  } as const;

  const updateCartItems = (newQuantity: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((prevCartItem) =>
        prevCartItem.id === id ? { ...prevCartItem, quantity: newQuantity } : { ...prevCartItem },
      ),
    );
  };

  const onUpdateCartItemCount = async (sign: 'minus' | 'plus') => {
    const newQuantity = NEW_QUANTITY_FUNCTION_MAP[sign]();

    await fetchCartItemCount(id, newQuantity);

    updateCartItems(newQuantity);
  };

  return { updateCartItems, getIncreasedQuantity, getDecreasedQuantity, onUpdateCartItemCount };
};

export default useUpdateCartItemCount;
