import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';

import { checkedCartItems } from '../../recoil/selectors/selectors';
import Header from '../../components/Header/Header';
import { FloatingButton } from '../../components/Button';

import { fetchCartItem } from '../../api';
import { cartData } from '../../recoil/atoms/atoms';

import * as S from './PaymentConfirmPage.style';

export default function PaymentConfirmPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalPrice } = location.state || {};

  const orderProduct = useRecoilValue(checkedCartItems);
  const cartTotalCount = orderProduct.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
  const cartCount = orderProduct.length;

  const setFetchCartData = useSetRecoilState(cartData);

  return (
    <div id="orderConfirmPage">
      <Header />
      <S.PaymentConfirm>
        <S.Title>주문 확인</S.Title>
        <S.SubTitle>
          총 {cartCount} 종류의 상품 {cartTotalCount}개를 주문합니다.
        </S.SubTitle>
        <S.SubTitle>최종 결제 금액을 확인해 주세요.</S.SubTitle>
        <S.TotalPriceLabel>총 결제 금액</S.TotalPriceLabel>
        <S.TotalPrice>{totalPrice.toLocaleString()}원</S.TotalPrice>
      </S.PaymentConfirm>
      <FloatingButton
        text="장바구니로 돌아가기"
        isDisable={false}
        onClick={async () => {
          navigate('/');
          setFetchCartData(await fetchCartItem());
        }}
      />
    </div>
  );
}
