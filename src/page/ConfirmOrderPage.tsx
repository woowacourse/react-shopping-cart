import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import FooterButton from '../components/FooterButton/FooterButton';
import Header from '../components/Header/Header';
import PreviousPageButton from '../components/PreviousPageButton/PreviousPageButton';
import convertToLocaleAmount from '../utils/convertToLocalePrice';
import ENDPOINTS from '../constants/endpoints';

export default function ConfirmOrderPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state) {
      navigate(ENDPOINTS.shoppingCart);
    }
  }, [location.state, navigate]);

  const { totalCartItemsCount, totalProductsCount, totalAmount } = location.state || {};

  const handleClickPreviousPageButton = () => {
    navigate(ENDPOINTS.shoppingCart);
  };

  return (
    <>
      <Header>
        <PreviousPageButton onClick={handleClickPreviousPageButton} />
      </Header>

      {location.state && (
        <ConfirmPurchaseContainer>
          <Title>주문 확인</Title>
          <Description>
            총 {totalCartItemsCount}종류의 상품 {totalProductsCount}개를 주문합니다.
            <br />
            최종 결제 금액을 확인해 주세요.
          </Description>

          <TotalAmount>
            <TotalAmountTitle>총 결제 금액</TotalAmountTitle>
            {convertToLocaleAmount(totalAmount)}
          </TotalAmount>
        </ConfirmPurchaseContainer>
      )}

      <FooterButton buttonText="결제하기" disabled />
    </>
  );
}

const ConfirmPurchaseContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  gap: '24px',
  height: '100%',
  flex: '1 0 auto',
});

const Title = styled.h2({
  fontSize: '24px',
  fontWeight: '700',
});

const Description = styled.p({
  color: '#0A0D13',
  fontSize: '12px',
  fontWeight: '500',
});

const TotalAmountTitle = styled.h3({
  color: '#0A0D13',
  fontSize: '16px',
  fontWeight: '700',
});

const TotalAmount = styled.div({
  fontSize: '24px',
  fontWeight: '700',
});
