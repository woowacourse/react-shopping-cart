import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { NavigationBar, PreviousPageButton, FooterButton } from '../../components/common';
import * as Styled from './ConfirmOrderPage.style';

import { convertToLocaleAmount } from '../../utils';
import { ENDPOINT } from '../../routes/router.constants';
import { useRecoilValue } from 'recoil';
import { checkedCartItemsState } from '../../recoil/atoms';
import { totalAmountState, totalCheckedQuantityState } from '../../recoil/selectors';

export default function ConfirmOrderPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state || !location.state.isFromCartPage) {
      navigate(ENDPOINT.shoppingCart);
    }
  }, [location.state, navigate]);

  const totalCheckedCartItems = useRecoilValue(checkedCartItemsState);
  const totalProductsCount = useRecoilValue(totalCheckedQuantityState);
  const totalAmount = useRecoilValue(totalAmountState);

  const handleClickPreviousPageButton = () => {
    navigate(ENDPOINT.shoppingCart);
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
            총 {totalCheckedCartItems.length}종류의 상품 {totalProductsCount}개를 주문합니다.
            <br />
            최종 결제 금액을 확인해 주세요.
          </Styled.Description>

          <Styled.TotalAmount>
            <Styled.TotalAmountTitle>총 결제 금액</Styled.TotalAmountTitle>
            {convertToLocaleAmount(totalAmount)}
          </Styled.TotalAmount>
        </Styled.ConfirmOrderContainer>
      )}

      <FooterButton type="button" buttonText="결제하기" disabled />
    </>
  );
}
