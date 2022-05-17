import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCartProductAsync,
  toggleProductCheck,
  updateCartProductQuantityAsync,
} from '../../../store/actions/cart';
import { Position } from '../../../styles/GlobalStyles';
import CheckBox from '../../common/CheckBox/CheckBox';
import Counter from '../../common/Counter/Counter';
import Icon from '../../common/Icon/Icon';
import Image from '../../common/Image/Image';
import * as Styled from './CartProductCard.style';

function CartProductCard({ product: { id, name, price, imageURL }, quantity }) {
  const dispatch = useDispatch();
  const checked = useSelector(({ cart }) => cart.checkedProductList.includes(String(id)));

  const toggleCheck = () => {
    dispatch(toggleProductCheck(String(id)));
  };

  const onIncrementQuantity = () => {
    dispatch(updateCartProductQuantityAsync(id, quantity + 1));
  };

  const onDecrementQuantity = () => {
    if (quantity === 1) {
      alert('주문할 수 있는 최소 수량입니다.');
      return;
    }
    dispatch(updateCartProductQuantityAsync(id, quantity - 1));
  };

  const onProductDelete = () => {
    if (window.confirm(`${name}을/를 장바구니에서 삭제하시겠습니까?`)) {
      dispatch(deleteCartProductAsync([id]));
    }
  };

  return (
    <Styled.Container>
      <CheckBox checked={checked} onClick={toggleCheck} />

      <Image src={imageURL} width="150px" />

      <Styled.Description>
        <Position position="absolute" top="0" right="0">
          <Styled.Button type="button" onClick={onProductDelete}>
            <Icon iconName="trash" fill="#333333" />
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

export default React.memo(CartProductCard);
