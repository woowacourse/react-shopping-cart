import Button from '@/components/common/Button/Button';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import * as Styled from './OrderForm.style';
function OrderForm() {
  const { cartList } = useSelector((state: any) => state.cart);

  const amount = useMemo(
    () => cartList.reduce((prev, cart) => prev + cart.price * cart.quantity, 0),
    [cartList],
  );
  return (
    <Styled.Container>
      <Styled.Title>결제 금액</Styled.Title>

      <Styled.Amount>
        <span>총 결제 금액</span>
        <span>{amount}원</span>
      </Styled.Amount>

      <Button padding="20px">{amount}원 결제하기</Button>
    </Styled.Container>
  );
}

export default OrderForm;
