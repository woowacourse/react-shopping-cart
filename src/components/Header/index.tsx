import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { totalAmountState } from '../../atoms/cart';
import { ReactComponent as Cart } from '../../assets/header-cart.svg';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { totalItems } = useRecoilValue(totalAmountState);

  return (
    <StyledHeaderWrapper>
      <StyledHeaderBox>
        <StyledLinkTitle to="/">
          <Cart width="35px" height="35px" />
          <StyledTitle>SHOP</StyledTitle>
        </StyledLinkTitle>
        <StyledCartWrapper>
          <StyledLinkTitle to="/cart">
            <StyledCart>장바구니</StyledCart>
            <StyledCartAmount data-cy="cart-amount">{totalItems}</StyledCartAmount>
          </StyledLinkTitle>
        </StyledCartWrapper>
      </StyledHeaderBox>
    </StyledHeaderWrapper>
  );
};

export default Header;

const StyledHeaderWrapper = styled.header`
  display: flex;
  justify-content: center;

  width: 100%;
  height: 84px;
  background-color: #333333;
`;

const StyledHeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 0 20px;
  width: 1080px;

  color: white;
`;

const StyledLinkTitle = styled(Link)`
  display: flex;
  align-items: center;
  gap: 5px;

  color: inherit;
`;

const StyledTitle = styled.div`
  font-size: 40px;
  font-weight: 600;
  letter-spacing: 3px;
  margin-left: 5px;
`;

const StyledCartWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StyledCart = styled.div`
  font-size: 24px;
  font-weight: 500;
  line-height: 12.3px;
`;

const StyledCartAmount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;

  background-color: #04c09e;
`;
