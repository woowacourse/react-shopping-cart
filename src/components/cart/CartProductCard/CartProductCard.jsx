import React, { useCallback, useMemo } from 'react';

import { CheckBox, Counter, Icon, Image } from 'components/common';

import { Position } from 'styles/GlobalStyles';
import { color } from 'styles/Theme.js';
import * as Styled from 'components/cart/CartProductCard/CartProductCard.style';
import useCart from 'hooks/useCart';

function CartProductCard({
  product: { id: productId, name, price, imageURL },
  quantity,
}) {
  const {
    decrementCartProduct,
    incrementCartProduct,
    deleteProduct,
    isChecked,
    toggleCheck,
  } = useCart();

  const handleQuantityIncrement = useCallback(
    () => incrementCartProduct(productId, quantity),
    [quantity],
  );

  const handleQuantityDecrement = useCallback(
    () => decrementCartProduct(productId, quantity),
    [quantity],
  );

  const handleProductDelete = useCallback(() => deleteProduct([productId]), []);

  const checked = useMemo(() => isChecked(productId), [isChecked]);

  const handleCheckBoxClick = useCallback(() => toggleCheck(productId), []);

  return (
    <Styled.Container>
      <CheckBox checked={checked} onClick={handleCheckBoxClick} />

      <Image src={imageURL} width="150px" />

      <Styled.Description>
        <Position position="absolute" top="0" right="0">
          <Styled.Button type="button" onClick={handleProductDelete}>
            <Icon iconName="Trash" fill={color.DARK_GRAY} />
          </Styled.Button>
        </Position>
        <Styled.Name>{name}</Styled.Name>
        <Counter
          count={quantity}
          onIncrement={handleQuantityIncrement}
          onDecrement={handleQuantityDecrement}
        />
        <Styled.Price>{price * quantity}원</Styled.Price>
      </Styled.Description>
    </Styled.Container>
  );
}

export default CartProductCard;
