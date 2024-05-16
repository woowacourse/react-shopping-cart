import { useRecoilValue } from 'recoil';
import Header from '../../Header/Header';
import OrderButton from '../../OrderButton/OrderButton';
import * as Styled from './style';
import { CartItemsCalculatorSelector } from '../../../recoil/cartItems';
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const navigator = useNavigate();

  const { totalCartItemQuantity, selectedCartItemCount, totalPaymentAmount } =
    useRecoilValue(CartItemsCalculatorSelector);

  return (
    <Styled.OrderConfirmation>
      <Header title="⬅" onClick={() => navigator(-1)} />
      <Styled.Container>
        <Styled.Content>
          <Styled.Title>주문 확인</Styled.Title>
          <Styled.OrderSuccessMessage>
            총 {selectedCartItemCount}종류의 상품 {totalCartItemQuantity}개를
            주문합니다.
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
      </Styled.Container>
      <OrderButton
        onClick={() => console.log('주문 확인')}
        label="주문 확인"
        isOrderable={false}
      />
    </Styled.OrderConfirmation>
  );
};

export default OrderConfirmation;
