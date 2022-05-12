import { useState } from "react";
import styled from "styled-components";
import { ColumnFlexWrapper, RowFlexWrapper } from "../../styles/Wrapper";
import { css } from "styled-components";
import { useDispatch } from "react-redux";
import {
  decreaseProductQuantity,
  increaseProductQuantity,
} from "../../redux/carts/carts.action";

const CountBox = styled.div`
  width: 48px;
  height: 40px;
  text-align: center;
  font-size: 16px;
  line-height: 40px;
`;

const CounterButton = styled.button`
  padding: 0;
  cursor: pointer;
  width: 28px;
  height: 20px;
  font-size: 10px;
  border: 1px solid;
  background-color: transparent;
  border-color: ${({ theme }) => theme.colors["gray_04"]};
`;

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
      <CountBox>{count}</CountBox>
      <ColumnFlexWrapper>
        <CounterButton onClick={increaseCount}>▲</CounterButton>
        <CounterButton onClick={decreaseCount} type="down">
          ▼
        </CounterButton>
      </ColumnFlexWrapper>
    </RowFlexWrapper>
  );
}

export default ItemCounter;
