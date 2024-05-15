import { fetchCartItemCount } from '@apis/shoppingCart';
import { CartItem } from '@appTypes/shoppingCart';
import { CountButton } from '@components/common';
import { cartItemsSelector } from '@recoil/shoppingCart';
import { formatKoreanCurrency } from '@utils/index';
import { useSetRecoilState } from 'recoil';

import * as Styled from './CartListDescription.styled';

interface CartListDescriptionContainerProps {
  cartItem: CartItem;
}

const CartListDescription: React.FC<CartListDescriptionContainerProps> = ({ cartItem }) => {
  const { product, quantity } = cartItem;

  const setCartItems = useSetRecoilState(cartItemsSelector);

  const updateCartItems = (quantity: number) => {
    setCartItems((prev) => prev.map((item) => (item.id === cartItem.id ? { ...item, quantity } : { ...item })));
  };

  const handleClickCountButton = async (sign: 'minus' | 'plus') => {
    const newQuantity = quantity + (sign === 'minus' && quantity ? -1 : +1);

    // TODO: 상수화 처리 필요
    if (newQuantity === 0 || newQuantity === 101) return alert('수량은 최소 1개 이상 100개 이하여야 합니다.');

    const isSuccess = await fetchCartItemCount(cartItem.id, newQuantity);

    if (isSuccess) {
      updateCartItems(newQuantity);
    }
  };

  return (
    <Styled.CartItemDescription>
      <span className="label">{product.name}</span>
      <span className="productPrice">{formatKoreanCurrency(product.price)}</span>
      <Styled.CartItemButtonGroup>
        <CountButton onClick={() => handleClickCountButton('minus')} sign="minus" />
        <span>{quantity}</span>
        <CountButton onClick={() => handleClickCountButton('plus')} sign="plus" />
      </Styled.CartItemButtonGroup>
    </Styled.CartItemDescription>
  );
};

export default CartListDescription;
