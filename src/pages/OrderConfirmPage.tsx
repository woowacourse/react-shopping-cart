import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import {
  calculateOrderPrice,
  checkedCartItems,
} from '../recoil/selectors/selectors';

import Header from '../components/Header/Header';
import { FloatingButton } from '../components/Button';
import {
  OrderConfirmStyle,
  Title,
  SubTitle,
  TotalPrice,
  TotalPriceLabel,
} from './OrderConfirmPage.style';

export default function OrderConfirmPage() {
  const navigate = useNavigate();

  const orderProduct = useRecoilValue(checkedCartItems);
  const cartTotalCount = orderProduct.reduce(
    (acc, cartItem) => acc + cartItem.quantity,
    0,
  );
  const cartCount = orderProduct.length;
  const { totalPrice } = useRecoilValue(calculateOrderPrice);

  return (
    <div id="orderConfirmPage">
      <Header
        imgType="arrow"
        onClick={() => {
          navigate(-1);
        }}
      />
      <OrderConfirmStyle>
        <Title>주문 확인</Title>
        <SubTitle>
          총 {cartCount} 종류의 상품 {cartTotalCount}개를 주문합니다.
        </SubTitle>
        <SubTitle>최종 결제 금액을 확인해 주세요.</SubTitle>
        <TotalPriceLabel>총 결제 금액</TotalPriceLabel>
        <TotalPrice>{totalPrice.toLocaleString('ko-kr')}원</TotalPrice>
      </OrderConfirmStyle>
      <FloatingButton text="결제하기" isDisable={true} />
    </div>
  );
}
