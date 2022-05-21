import React from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import styled from 'styled-components';

function Counter() {
  return (
    <StyledCounterLayout>
      <StyledNumberBox>
        <span>2</span>
      </StyledNumberBox>
      <StyledArrowWrapper>
        <StyledArrowBox>
          <TiArrowSortedDown size={20} />
        </StyledArrowBox>
        <StyledArrowBox>
          <TiArrowSortedUp size={20} />
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
