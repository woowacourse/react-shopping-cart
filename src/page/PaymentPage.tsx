import { useLocation, useNavigate } from 'react-router';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import { css } from '@emotion/react';
import { getLocalStorage } from '../utils/localStorage';
import { CartItemType } from '../domain/mapper/cartItemMapper';
import { STORAGE_KEYS } from '../constants/localStorageKey';
import { calculateTotalQuantity } from '../domain/order/calculateOrderInfo';

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalPaymentAmount } = location.state ?? {};
  const items = getLocalStorage<CartItemType[]>(STORAGE_KEYS.SELECTED_ITEMS, []);

  const totalQuantity = calculateTotalQuantity(items);
  return (
    <>
      <Header
        left={
          <button onClick={() => navigate(-1)}>
            <img src="./assets/back.svg" />
          </button>
        }
      />
      <main css={layoutCss}>
        <h1 css={titleCss}>주문 확인</h1>
        <p css={descriptionCss}>
          총 {items.length}종류의 상품 {totalQuantity}개를 주문합니다.
          <br />
          최종 결제 금액을 확인해 주세요.
        </p>
        <p css={priceTitleCss}>총 결제 금액</p>
        <p css={priceCss}>{totalPaymentAmount.toLocaleString()}원</p>
      </main>
      <Button onClick={() => navigate('/')}>장바구니로 돌아가기</Button>
    </>
  );
}

const layoutCss = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '36px 24px',
  height: '100%'
});

const titleCss = css({
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '24px'
});

const descriptionCss = css({
  fontSize: '12px',
  marginBottom: '24px',
  textAlign: 'center'
});

const priceTitleCss = css({
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '12px'
});

const priceCss = css({
  fontSize: '20px',
  fontWeight: 'bold'
});
