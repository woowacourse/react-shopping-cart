import { IOrderInfo } from '../../recoil/selectors';
import { ROUTER_URL } from '../../constants/constants';
import FloatingButton from '../FloatingButton/FloatingButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import * as S from './styled';

const PaymentInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const orderInfo = location.state as IOrderInfo | null;

  const onReturnToShoppingCartButtonClick = () => {
    navigate(ROUTER_URL.MAIN);
  };

  useEffect(() => {
    if (orderInfo === null) navigate(ROUTER_URL.ERROR);
  }, [location.pathname, navigate, orderInfo]);

  return (
    <>
      <S.Container>
        <S.Title>주문 확인</S.Title>
        <S.ConfirmMessage>{`총 ${orderInfo?.kindCount}종류의 상품 ${orderInfo?.productCount}개를 주문합니다.
최종 결제 금액을 확인해 주세요.`}</S.ConfirmMessage>
        <S.PriceInfo>
          <S.PriceInfoTitle>총 결제 금액</S.PriceInfoTitle>
          <S.Price>{orderInfo?.totalPrice.toLocaleString()}원</S.Price>
        </S.PriceInfo>
      </S.Container>
      <FloatingButton label={'장바구니로 돌아가기'} onClick={onReturnToShoppingCartButtonClick} />
    </>
  );
};

export default PaymentInfo;
