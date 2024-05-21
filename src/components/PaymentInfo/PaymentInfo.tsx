import { useEffect } from 'react';
import { IPaymentInfo } from '../../recoil/selectors';
import * as S from './styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTER_URLS } from '../../constants/constants';
import FloatingButton from '../FloatingButton/FloatingButton';

const PaymentInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const paymentInfo = location.state as IPaymentInfo | null;

  useEffect(() => {
    if (paymentInfo === null) navigate(ROUTER_URLS.ERROR);
  }, [location.pathname, navigate, paymentInfo]);

  const goMain = () => {
    navigate(ROUTER_URLS.MAIN);
  };

  return (
    <>
      <S.Container>
        <S.Title>결제 확인</S.Title>
        <S.ConfirmMessage>{`총 ${paymentInfo?.kindCount}종류의 상품 ${paymentInfo?.productCount}개를 주문했습니다.
최종 결제 금액을 확인해 주세요.`}</S.ConfirmMessage>
        <S.PriceInfo>
          <S.PriceInfoTitle>총 결제 금액</S.PriceInfoTitle>
          <S.Price>{paymentInfo?.totalPrice.toLocaleString()}원</S.Price>
        </S.PriceInfo>
      </S.Container>
      <FloatingButton label={'장바구니로 돌아가기'} onClick={goMain} />
    </>
  );
};

export default PaymentInfo;
