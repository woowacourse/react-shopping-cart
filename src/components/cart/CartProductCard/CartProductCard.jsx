import React, { useCallback, useMemo } from 'react';

import { useDispatch } from 'react-redux';
import { deleteCartProductAsync, updateCartProductQuantityAsync } from 'store/actions/cart';

import useCartCheckedProducts from 'hooks/useCartCheckedProducts';

import CheckBox from 'components/common/CheckBox/CheckBox';
import Counter from 'components/common/Counter/Counter';
import Icon from 'components/common/Icon/Icon';
import Image from 'components/common/Image/Image';

import { Position } from 'styles/GlobalStyles';
import { color } from 'styles/Theme.js';
import * as Styled from 'components/cart/CartProductCard/CartProductCard.style';

const MINIMUM_QUANTITY_WARNING_MESSAGE = '주문할 수 있는 최소 수량입니다.';
const PRODUCT_DELETE_WARNING = '상품을 장바구니에서 삭제하시겠습니까?';

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
      alert(MINIMUM_QUANTITY_WARNING_MESSAGE);
      return;
    }
    dispatch(updateCartProductQuantityAsync(productId, quantity - 1));
  };

  const onProductDelete = () => {
    if (window.confirm(`${name}: ${PRODUCT_DELETE_WARNING}`)) {
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
