import React from 'react';
import styled from 'styled-components';

function OrderBox() {
  return (
    <StyledOrderBoxLayout>
      <StyledOrderTitle>
        <span>결제예상금액</span>
      </StyledOrderTitle>
      <StyledOrderContent>
        <StyledOrderContentInfo>
          <StyledUnderLineText>결제예상금액</StyledUnderLineText>
          <StyledUnderLineText>20,000원</StyledUnderLineText>
        </StyledOrderContentInfo>
        <div>
          <StyledButton>
            주문하기(<span>2</span>개)
          </StyledButton>
        </div>
      </StyledOrderContent>
    </StyledOrderBoxLayout>
  );
}

const StyledOrderBoxLayout = styled.div`
  border: 1px solid #dddddd;
  border-radius: 0px;
  margin-top: 122px;
  height: 300px;
`;

const StyledOrderTitle = styled.div`
  border-bottom: 4px solid #dddddd;
  height: 25%;
  font-weight: 400;
  font-size: 24px;
  line-height: 33px;
  letter-spacing: 0.5px;
  color: #333333;
  display: flex;
  align-items: center;
  padding: 0 10%;
`;

const StyledOrderContent = styled.div`
  padding: 10% 10%;
`;

const StyledOrderContentInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledUnderLineText = styled.span`
  font-weight: 700;
  font-size: 1.3rem;
  line-height: 27px;
  text-align: center;
  letter-spacing: 0.5px;
  color: #333333;
  background: linear-gradient(to bottom, #fff, 0%, rgba(42, 193, 188, 0.5));
  background-repeat: repeat-x;
  background-size: 100vw 0.4rem;
  background-position: left bottom 5px;
`;

const StyledButton = styled.button`
  background: #2ac1bc;
  border-radius: 0px;
  border: none;
  width: 100%;
  height: 73px;
  font-weight: 400;
  font-size: 24px;
  line-height: 21px;
  text-align: center;
  color: #ffffff;
  margin-top: 2rem;
`;

export default OrderBox;
