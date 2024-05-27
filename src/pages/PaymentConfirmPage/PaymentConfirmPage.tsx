import { Link, Navigate, useLocation } from 'react-router-dom';

import SubmitButton from '../../components/Button/SubmitButton/SubmitButton';
import TitleContainer from '../../components/Container/TitleContainer/TitleContainer';
import Header from '../../components/Header/Header';
import { PATHS } from '../../constants/PATHS';
import * as S from './PaymentConfirmPage.style';

function PaymentConfirmPage() {
  const location = useLocation();
  const confirmData = location.state;

  if (confirmData.totalPrice <= 0) {
    return <Navigate to={PATHS.ERROR} />;
  }

  return (
    <div>
      <Header />
      <S.Layout>
        <TitleContainer title="주문 확인" />
        <S.OrderDetailText>
          총 {confirmData.typeCount}종류의 상품 {confirmData.quantityCount}개를 주문합니다.
          <br />
          최종 결제 금액을 확인해주세요.
        </S.OrderDetailText>
        <S.TotalPriceContainer>
          <S.TotalPriceTitle>총 결제 금액</S.TotalPriceTitle>
          <S.TotalPriceValue>{confirmData.totalPrice.toLocaleString()}원</S.TotalPriceValue>
        </S.TotalPriceContainer>
      </S.Layout>
      <Link to={PATHS.ROOT}>
        <SubmitButton isActive={true} content="장바구니로 돌아가기" />
      </Link>
    </div>
  );
}

export default PaymentConfirmPage;
