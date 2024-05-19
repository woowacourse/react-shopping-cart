import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { NavigationBar, PreviousPageButton, FooterButton } from '../../components/common';
import * as Styled from './ConfirmOrderPage.style';

import { convertToLocaleAmount } from '../../utils';
import { ENDPOINTS } from '../../constants';

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
      <NavigationBar>
        <PreviousPageButton onClick={handleClickPreviousPageButton} />
      </NavigationBar>

      {location.state && (
        <Styled.ConfirmOrderContainer>
          <Styled.Title>주문 확인</Styled.Title>
          <Styled.Description>
            총 {totalCartItemsCount}종류의 상품 {totalProductsCount}개를 주문합니다.
            <br />
            최종 결제 금액을 확인해 주세요.
          </Styled.Description>

          <Styled.TotalAmount>
            <Styled.TotalAmountTitle>총 결제 금액</Styled.TotalAmountTitle>
            {convertToLocaleAmount(totalAmount)}
          </Styled.TotalAmount>
        </Styled.ConfirmOrderContainer>
      )}

      <FooterButton buttonText="결제하기" disabled />
    </>
  );
}
