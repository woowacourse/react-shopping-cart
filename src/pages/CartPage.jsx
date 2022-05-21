import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CartList from '../components/CartList';
import OrderBox from '../components/common/OrderBox';

function CartPage() {
  const { products } = useSelector((state) => state.cart);

  return (
    <StyledContentLayout>
      <StyledContentWrapper>
        <StyledContentHeader>
          <StyledHeaderTitle>장바구니</StyledHeaderTitle>
        </StyledContentHeader>
        <StyledContent>
          <CartList products={products} />
          <OrderBox />
        </StyledContent>
      </StyledContentWrapper>
    </StyledContentLayout>
  );
}

const StyledContentLayout = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 3vh;
`;

const StyledContentWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  overflow: auto;
`;

const StyledContentHeader = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;

  border-bottom: 4px solid #333333;
  padding: 24px 0;
`;

const StyledHeaderTitle = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;
  text-align: center;
  letter-spacing: 0.5px;
  color: #333333;
`;

const StyledContent = styled.div`
  width: 90%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 2fr));
  gap: 40px;
`;

export default CartPage;
