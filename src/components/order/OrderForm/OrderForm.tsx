import Button from '@/components/common/Button/Button';
import * as Styled from './OrderForm.style';
function OrderForm({ amount }) {
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
