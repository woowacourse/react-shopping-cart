import { useLocation, useNavigate } from 'react-router';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import { css } from '@emotion/react';
import { useEffect } from 'react';

function OrderPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalQuantity, countOfItemType, totalAmount } = location.state ?? {};

  useEffect(() => {
    if (!totalQuantity || !countOfItemType || !totalAmount) {
      const isConfirmed = confirm('비정상적인 접근입니다. 장바구니로 이동하시겠습니까?');
      if (isConfirmed) {
        navigate('/');
      }
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

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
          총 {countOfItemType}종류의 상품 {totalQuantity}개를 주문합니다.
          <br />
          최종 결제 금액을 확인해 주세요.
        </p>
        <p css={priceTitleCss}>총 결제 금액</p>
        <p css={priceCss}>{totalAmount?.toLocaleString()}원</p>
      </main>
      <Button>결제하기</Button>
    </>
  );
}

export default OrderPage;

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
