import React from 'react';
import * as Styled from './CartAdd.style';
import * as GlobalStyled from '../../../styles/GlobalStyles';
import Counter from '../../common/Counter/Counter';
import { useCount } from '../../../hooks/useCount';
function CartAdd({ product: { name, price, quantity }, closeModal }) {
  const [count, increase, decrease] = useCount({ initialValue: 1, min: 1, max: quantity });

  const onClickCartAdd = () => {
    alert(`${count}개의 상품이 장바구니에 추가되었습니다. (추후 구현)`);
    closeModal();
  };

  return (
    <Styled.Container>
      <GlobalStyled.Position>
        <Styled.ProductInfoWrapper>
          <Styled.Name>{name}</Styled.Name>
          <Styled.Price>{price} 원</Styled.Price>
          <GlobalStyled.Position position="absolute" right="0" bottom="0">
            <Counter count={count} increase={increase} decrease={decrease} />
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

export default CartAdd;
