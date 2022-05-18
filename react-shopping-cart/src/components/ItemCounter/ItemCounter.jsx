import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import {
  decreaseProductQuantity,
  increaseProductQuantity,
} from 'redux/carts/carts.action';

import { ColumnFlexWrapper, RowFlexWrapper } from 'styles/Wrapper';

//재사용O
function ItemCounter({ id }) {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();

  const increaseCount = () => {
    setCount((prev) => prev + 1);
    dispatch(increaseProductQuantity(id));
  };

  const decreaseCount = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
      dispatch(decreaseProductQuantity(id));
    }
  };

  return (
    <RowFlexWrapper border="1px solid" bColor="gray_04" width="70px">
      <Styled.CountBox>{count}</Styled.CountBox>
      <ColumnFlexWrapper>
        <Styled.CounterButton onClick={increaseCount}>▲</Styled.CounterButton>
        <Styled.CounterButton onClick={decreaseCount} type="down">
          ▼
        </Styled.CounterButton>
      </ColumnFlexWrapper>
    </RowFlexWrapper>
  );
}

const Styled = {
  CountBox: styled.div`
    width: 48px;
    height: 40px;
    text-align: center;
    font-size: 16px;
    line-height: 40px;
  `,
  CounterButton: styled.button`
    padding: 0;
    cursor: pointer;
    width: 28px;
    height: 20px;
    font-size: 10px;
    border: 1px solid ${({ theme }) => theme.colors.gray_04};
    background-color: transparent;
  `,
};

export default ItemCounter;
