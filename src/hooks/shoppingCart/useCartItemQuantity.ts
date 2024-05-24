import ShoppingCartFetcher from '@apis/shoppingCart';
import { QUANTITY } from '@constants/shippingCart';
import { quantityAtomFamily } from '@recoil/shoppingCart';
import { useRecoilState } from 'recoil';

const useCartItemQuantity = (id: number) => {
  const [quantity, setQuantity] = useRecoilState(quantityAtomFamily(id));

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

  const updateCartItemQuantity = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const onUpdateCartItemCount = async (sign: 'minus' | 'plus') => {
    const newQuantity = NEW_QUANTITY_FUNCTION_MAP[sign]();

    await ShoppingCartFetcher.patchCartItemCount(id, newQuantity);

    updateCartItemQuantity(newQuantity);
  };

  return { quantity, updateCartItemQuantity, getIncreasedQuantity, getDecreasedQuantity, onUpdateCartItemCount };
};

export default useCartItemQuantity;
