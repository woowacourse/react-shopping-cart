import { useEffect } from 'react';
import { IOrderInfo } from '../../recoil/selectors';
import * as S from './styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTER_URL } from '../../constants/constants';
import FloatingButton from '../FloatingButton/FloatingButton';

const OrderInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const orderInfo = location.state as IOrderInfo | null;

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
      <FloatingButton label={'결제하기'} disabled></FloatingButton>
    </>
  );
};

export default OrderInfo;
