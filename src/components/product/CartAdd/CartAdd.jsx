import React from 'react';
import * as Styled from './CartAdd.style';
import * as GlobalStyled from '../../../styles/GlobalStyles';
import Counter from '../../common/Counter/Counter';
import { useCount } from '../../../hooks/useCount';
import { useDispatch } from 'react-redux';
import { addToCartAsync } from '../../../store/actions/cart';
function CartAdd({ product: { id, name, price, quantity }, closeModal }) {
  const [count, onIncrement, onDecrement] = useCount({ initialValue: 1, min: 1, max: quantity });

  const dispatch = useDispatch();

  const onClickCartAdd = () => {
    dispatch(addToCartAsync(id, count));
    alert(`${name} 상품 ${count}개가 장바구니에 추가되었습니다.`);
    closeModal();
  };

  return (
    <Styled.Container>
      <GlobalStyled.Position>
        <Styled.ProductInfoWrapper>
          <Styled.Name>{name}</Styled.Name>
          <Styled.Price>{price} 원</Styled.Price>
          <GlobalStyled.Position position="absolute" right="0" bottom="0">
            <Counter count={count} onIncrement={onIncrement} onDecrement={onDecrement} />
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
