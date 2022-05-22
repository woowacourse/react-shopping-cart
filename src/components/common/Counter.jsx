import React, { useState } from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import styled from 'styled-components';

function Counter({ onClickCallback }) {
  const [count, setCount] = useState(1);

  const handlUp = (count) => {
    setCount((prev) => prev + 1);
    onClickCallback(count + 1);
  };

  const handleDown = (count) => {
    if (count === 1) return;
    setCount((prev) => prev - 1);
    onClickCallback(count - 1);
  };

  return (
    <StyledCounterLayout>
      <StyledNumberBox>
        <span>{count}</span>
      </StyledNumberBox>
      <StyledArrowWrapper>
        <StyledArrowBox onClick={() => handlUp(count)}>
          <TiArrowSortedUp size={20} />
        </StyledArrowBox>
        <StyledArrowBox onClick={() => handleDown(count)}>
          <TiArrowSortedDown size={20} />
        </StyledArrowBox>
      </StyledArrowWrapper>
    </StyledCounterLayout>
  );
}

const StyledCounterLayout = styled.div`
  border: 1px solid #dddddd;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100px;
`;

const StyledNumberBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 400;
  font-size: 24px;
  line-height: 19px;
  letter-spacing: 0.5px;
  color: #333333;
`;

const StyledArrowWrapper = styled.div``;

const StyledArrowBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #dddddd;
  &:nth-child(1) {
    border-bottom: 1px solid #dddddd;
  }
  cursor: pointer;
`;

export default Counter;
