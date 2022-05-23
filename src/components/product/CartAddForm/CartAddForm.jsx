import React from 'react';

import { Counter } from 'components/common';
import { useCount } from 'hooks/useCount';

import * as Styled from 'components/product/CartAddForm/CartAddForm.style';
import * as GlobalStyled from 'styles/GlobalStyles';
import useCart from 'hooks/useCart';

function CartAddForm({ product: { id, name, price, quantity }, closeModal }) {
  const [count, handleIncrement, handleDecrement] = useCount({
    initialValue: 1,
    min: 1,
    max: quantity,
  });
  const { addProduct } = useCart();

  const onClickCartAdd = () => {
    addProduct({ id, name, count });
    closeModal();
  };

  return (
    <Styled.Container>
      <GlobalStyled.Position>
        <Styled.ProductInfoWrapper>
          <Styled.Name>{name}</Styled.Name>
          <Styled.Price>{price} 원</Styled.Price>
          <GlobalStyled.Position position="absolute" right="0" bottom="0">
            <Counter
              count={count}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />
          </GlobalStyled.Position>
        </Styled.ProductInfoWrapper>
      </GlobalStyled.Position>

      <Styled.TotalPriceWrapper>
        <Styled.Title>합계</Styled.Title>
        <Styled.TotalPrice>{price * count} 원</Styled.TotalPrice>
      </Styled.TotalPriceWrapper>

      <Styled.Button onClick={onClickCartAdd}>장바구니에 담기</Styled.Button>
    </Styled.Container>
  );
}

export default CartAddForm;
