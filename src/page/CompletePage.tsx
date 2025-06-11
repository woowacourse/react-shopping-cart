import { useLocation, useNavigate } from 'react-router';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import { css } from '@emotion/react';
import { usePageStateGuard } from '../hooks/usePageStateGuard';

function CompletePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalQuantity, countOfItemType, totalAmountAfterDiscount } = location.state ?? {};

  const isPageStateValid =
    totalQuantity !== undefined || countOfItemType !== undefined || totalAmountAfterDiscount !== undefined;

  usePageStateGuard({
    isValid: isPageStateValid
  });

  return (
    <>
      <Header left={null} />
      <main css={layoutCss}>
        <h1 css={titleCss}>주문 확인</h1>
        <p css={descriptionCss}>
          총 {countOfItemType}종류의 상품 {totalQuantity}개를 주문합니다.
          <br />
          최종 결제 금액을 확인해 주세요.
        </p>
        <p css={priceTitleCss}>총 결제 금액</p>
        <p css={priceCss}>{totalAmountAfterDiscount?.toLocaleString()}원</p>
      </main>
      <Button onClick={() => navigate('/')}>장바구니로 돌아가기</Button>
    </>
  );
}

export default CompletePage;

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
