import { useLocation } from 'react-router-dom';
import * as S from './PaymentConfirmationPage.styles';
import { Title, Subtitle } from '../../styles/@common/title/Title.styles';
import Button from '../../components/@common/button/Button';
import useEasyNavigate from '../../hooks/useEasyNavigate';

interface PaymentConfirmationState {
  productTypeCount: number;
  totalProductCount: number;
  finalAmount: number;
}

const PaymentConfirmationPage = () => {
  const { state } = useLocation() as { state: PaymentConfirmationState };
  const { productTypeCount, totalProductCount, finalAmount } = state;
  const { goCart } = useEasyNavigate();

  const handleGoToCart = () => {
    goCart();
  };

  return (
    <section css={S.Container}>
      <div css={S.ContentContainer}>
        <div css={S.IconContainer}>
          <div css={S.CheckIcon}>✓</div>
        </div>

        <h1 css={Title}>결제가 완료되었습니다</h1>

        <div css={S.OrderSummaryContainer}>
          <p css={S.OrderSummaryText}>
            총 <strong>{productTypeCount}종류</strong>의 상품{' '}
            <strong>{totalProductCount}개</strong>를 주문하셨습니다.
          </p>

          <div css={S.FinalAmountContainer}>
            <p css={S.FinalAmountLabel}>최종 결제 금액</p>
            <p css={S.FinalAmount}>{finalAmount.toLocaleString()}원</p>
          </div>
        </div>

        <div css={S.ThankYouMessage}>
          <p css={Subtitle}>이용해 주셔서 감사합니다.</p>
          <p css={S.DeliveryInfo}>
            주문하신 상품은 빠른 시일 내에 배송될 예정입니다.
          </p>
        </div>
      </div>

      <div css={S.ButtonContainer}>
        <Button variant="largeBlack" onClick={handleGoToCart}>
          장바구니로 돌아가기
        </Button>
      </div>
    </section>
  );
};

export default PaymentConfirmationPage;
