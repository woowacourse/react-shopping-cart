import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { NavigationBar, FooterButton } from '../../components/common';
import * as Styled from './ConfirmPaymentPage.style';

import { convertToLocaleAmount } from '../../utils';
import { ENDPOINT } from '../../routes/router.constants';
import { useRecoilValue } from 'recoil';
import {
  checkedCartItemsState,
  totalAmountState,
  totalCheckedQuantityState,
} from '../../recoil/selectors';

export default function ConfirmPaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state || !location.state.isFromOrderPage) {
      navigate(ENDPOINT.shoppingCart);
    }
  }, [location.state, navigate]);

  const totalCheckedCartItems = useRecoilValue(checkedCartItemsState);
  const totalProductsCount = useRecoilValue(totalCheckedQuantityState);
  const totalAmount = useRecoilValue(totalAmountState);

  const handleClickFooterButton = () => {
    navigate(ENDPOINT.shoppingCart);
  };

  return (
    <>
      <NavigationBar />

      {location.state && (
        <Styled.ConfirmPaymentContainer>
          <Styled.Title>결제 확인</Styled.Title>
          <Styled.Description>
            총 {totalCheckedCartItems.length}종류의 상품 {totalProductsCount}개를 주문했습니다.
            <br />
            최종 결제 금액을 확인해 주세요.
          </Styled.Description>

          <Styled.TotalAmount>
            <Styled.TotalAmountTitle>총 결제 금액</Styled.TotalAmountTitle>
            {convertToLocaleAmount(totalAmount)}
          </Styled.TotalAmount>
        </Styled.ConfirmPaymentContainer>
      )}

      <FooterButton
        type="button"
        buttonText="장바구니로 돌아가기"
        onClick={handleClickFooterButton}
      />
    </>
  );
}
