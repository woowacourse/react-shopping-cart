import React, { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ShoppingItem from '../components/ShoppingItem';
import { COLORS } from '../styles/theme';
import { StyledCheckbox } from '../components/common/Styled';

function ShoppingCart() {
  const [totalPrice, setTotalPrice] = useState();
  const [isCheckedAll, setCheckedAll] = useReducer((checked) => !checked, true);
  const cartList = useSelector(({ cart }) => cart.cart);

  useEffect(() => {
    const sum = cartList.reduce((acc, cur) => (acc += Number(cur.price)), 0);
    setTotalPrice(sum);
  }, [cartList, totalPrice]);

  return (
    <StyledSection>
      <StyledHeader>
        <h1>장바구니</h1>
        <StyledDivideLine margin={20} size={2} color={COLORS.BLACK} />
      </StyledHeader>
      <StyledContainer>
        <StyledLeftSection>
          <StyledLeftDiv>
            <StyledCheckboxContainer>
              <StyledCheckbox
                name="checkbox"
                type="checkbox"
                checked={isCheckedAll}
                onChange={() => setCheckedAll()}
              />
              <StyledLabel htmlfor="checkbox">선택해제</StyledLabel>
            </StyledCheckboxContainer>
            <StyledDeleteButton>상품삭제</StyledDeleteButton>
          </StyledLeftDiv>
          <StyledTitle>든든배송 상품(3개)</StyledTitle>
          <StyledDivideLine margin={10} size={2} color={COLORS.GRAY} />
          {cartList.map((item) => (
            <React.Fragment key={item.id}>
              <ShoppingItem item={item} isCheckedAll={isCheckedAll} />
              <StyledDivideLine margin={10} size={1} color={COLORS.GRAY} />
            </React.Fragment>
          ))}
        </StyledLeftSection>
        <StyledRightSection>
          <StyledRightSectionTop>
            <StyledTitle>결제예상금액</StyledTitle>
          </StyledRightSectionTop>
          <StyledDivideLine margin={10} size={1} color={COLORS.GRAY} />
          <div>
            <StyledAmount>
              <StyledHighlight>결제예상금액</StyledHighlight>
              <StyledHighlight>{Number(totalPrice).toLocaleString()}원</StyledHighlight>
            </StyledAmount>
            <StyledOrderButtonWrapper>
              <StyledOrderButton>주문하기(3개)</StyledOrderButton>
            </StyledOrderButtonWrapper>
          </div>
        </StyledRightSection>
      </StyledContainer>
    </StyledSection>
  );
}

const StyledDivideLine = styled.hr`
  width: 100%;
  margin: ${(props) => props.size};
  border: ${(props) => `${props.size}px solid ${props.color}`};
`;

const StyledSection = styled.section`
  width: 80%;
  margin: auto;
`;

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  h2 {
    font-size: 24px;
    font-weight: 600;
  }
`;

const StyledContainer = styled.div`
  display: flex;
`;

const StyledDeleteButton = styled.button`
  padding: 12px 22px;
  background-color: ${COLORS.WHITE};
  border: 1px solid ${COLORS.LIGHT_GRAY};
  border-radius: 4px;
  &:hover {
    background-color: ${COLORS.LIGHT_GRAY};
  }
`;

const StyledLeftSection = styled.section`
  width: 60%;
`;

const StyledLeftDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 45px 0;
`;

const StyledRightSection = styled.section`
  width: 35%;
  height: 260px;
  margin-left: 5%;
  margin-top: 80px;
  border: 1px solid #dddddd;
`;

const StyledTitle = styled.h3`
  display: flex;
  align-items: center;
  font-size: 20px;
`;

const StyledCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLabel = styled.label`
  padding-left: 7px;
`;

const StyledRightSectionTop = styled.div`
  display: flex;
  align-items: center;
  padding: 0 30px;
`;

const StyledAmount = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 20px;
`;

const StyledHighlight = styled.span`
  position: relative;
  font-weight: 700;
  display: inline-block;
  text-align: center;
  padding: 0 2px;
  font-size: 20px;
  &:after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 8px;
    background-color: ${COLORS.PRIMARY};
    opacity: 0.5;
    z-index: -1;
  }
`;

const StyledOrderButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0 20px;
`;

const StyledOrderButton = styled.button`
  background: ${COLORS.PRIMARY};
  font-size: 20px;
  color: ${COLORS.WHITE};
  width: 90%;
  padding: 15px;
  border: none;
  border-radius: 4px;
`;

export default ShoppingCart;
