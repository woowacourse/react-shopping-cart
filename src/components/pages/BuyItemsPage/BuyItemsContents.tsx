import {
  selectedCartItemsSelector,
  totalCartItemQuantitySelector,
  totalPaymentAmountSelector,
} from '../../../recoil/cartItems';
import * as Styled from './style';

import { useRecoilValue } from 'recoil';

const BuyItemsContents = () => {
  const totalPaymentAmount = useRecoilValue(totalPaymentAmountSelector);
  const totalCartItemQuantity = useRecoilValue(totalCartItemQuantitySelector);

  const selectedCartItems = useRecoilValue(selectedCartItemsSelector);

  return (
    <Styled.Content>
      <Styled.Title>주문 확인</Styled.Title>
      <Styled.OrderSuccessMessage>
        총 {selectedCartItems.length}종류의 상품
        {totalCartItemQuantity}개를 주문합니다.
        <br /> 최종 결제 금액을 확인해 주세요.
      </Styled.OrderSuccessMessage>
      <Styled.TotalPaymentAmountContainer>
        <Styled.TotalPaymentAmountMessage>
          총 결제 금액
        </Styled.TotalPaymentAmountMessage>
        <Styled.TotalPaymentAmount>
          {totalPaymentAmount.toLocaleString('ko-kr')}원
        </Styled.TotalPaymentAmount>
      </Styled.TotalPaymentAmountContainer>
    </Styled.Content>
  );
};

export default BuyItemsContents;
