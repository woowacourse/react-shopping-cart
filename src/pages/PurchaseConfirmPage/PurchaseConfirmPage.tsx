import { BottomButton } from '@components/common';
import { useSelectedCartItems } from '@hooks/index';
import { selectedIdsAtom, totalPriceSelector } from '@recoil/shoppingCart';
import { ROUTE_PATHS } from '@routes/route.constant';
import { formatKoreanCurrency } from '@utils/currency';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import * as Styled from './PurchaseConfirmPage.styled';

const PurchaseConfirmPage = () => {
  const totalPrice = useRecoilValue(totalPriceSelector);
  const resetSelectedIds = useResetRecoilState(selectedIdsAtom);

  const { totalSelectedItemLength, selectedTotalQuantity } = useSelectedCartItems();
  const navigate = useNavigate();

  const handleClickBottomButton = () => {
    // 선택된 상품 목록 reset
    resetSelectedIds();
    // 장바구니로 이동
    navigate(ROUTE_PATHS.root);
  };

  return (
    <Styled.PurchaseConfirmPageContainer>
      <Styled.Title>주문 확인</Styled.Title>
      <Styled.GuidText>
        총 {totalSelectedItemLength}종류의 상품 {selectedTotalQuantity}개를 주문합니다.
      </Styled.GuidText>
      <Styled.GuidText>최종 결제 금액을 확인해 주세요.</Styled.GuidText>
      <Styled.TotalPriceTitle>총 결제 금액 </Styled.TotalPriceTitle>
      <Styled.TotalPrice>{formatKoreanCurrency(totalPrice)}</Styled.TotalPrice>
      <BottomButton onClick={handleClickBottomButton}>장바구니로 돌아가기</BottomButton>
    </Styled.PurchaseConfirmPageContainer>
  );
};

export default PurchaseConfirmPage;
