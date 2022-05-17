import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import useCartCheckedProducts from '../../../hooks/useCartCheckedProducts';
import {
  deleteCartProductAsync,
  updateCartProductQuantityAsync,
} from '../../../store/actions/cart';
import { Position } from '../../../styles/GlobalStyles';
import CheckBox from '../../common/CheckBox/CheckBox';
import Counter from '../../common/Counter/Counter';
import Icon from '../../common/Icon/Icon';
import Image from '../../common/Image/Image';
import * as Styled from './CartProductCard.style';
import { color } from '../../../styles/Theme.js';

function CartProductCard({ product: { id: productId, name, price, imageURL }, quantity }) {
  const dispatch = useDispatch();

  const { isChecked, toggleCheck } = useCartCheckedProducts();

  const checked = useMemo(() => isChecked(productId), [isChecked]);

  const onCheckBoxClick = useCallback(() => toggleCheck(productId), []);

  const onIncrementQuantity = () => {
    dispatch(updateCartProductQuantityAsync(productId, quantity + 1));
  };

  const onDecrementQuantity = () => {
    if (quantity === 1) {
      alert('주문할 수 있는 최소 수량입니다.');
      return;
    }
    dispatch(updateCartProductQuantityAsync(productId, quantity - 1));
  };

  const onProductDelete = () => {
    if (window.confirm(`해당 상품을 장바구니에서 삭제하시겠습니까?`)) {
      dispatch(deleteCartProductAsync([productId]));
    }
  };

  return (
    <Styled.Container>
      <CheckBox checked={checked} onClick={onCheckBoxClick} />

      <Image src={imageURL} width="150px" />

      <Styled.Description>
        <Position position="absolute" top="0" right="0">
          <Styled.Button type="button" onClick={onProductDelete}>
            <Icon iconName="trash" fill={color.DARK_GRAY} />
          </Styled.Button>
        </Position>
        <Styled.Name>{name}</Styled.Name>
        <Counter
          count={quantity}
          onIncrement={onIncrementQuantity}
          onDecrement={onDecrementQuantity}
        />
        <Styled.Price>{price * quantity}원</Styled.Price>
      </Styled.Description>
    </Styled.Container>
  );
}

export default CartProductCard;
