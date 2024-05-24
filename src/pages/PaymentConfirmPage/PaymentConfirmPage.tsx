import { Link, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import SubmitButton from '../../components/Button/SubmitButton/SubmitButton';
import TitleContainer from '../../components/Container/TitleContainer/TitleContainer';
import Header from '../../components/Header/Header';
import { PATHS } from '../../constants/PATHS';
import { useCalculateDeliveryFee } from '../../hooks/useCalculateDeliveryFee';
import { useCalculateTotalCouponDiscount } from '../../hooks/useCalculateTotalCouponDiscount';
import { selectedCartItemListState } from '../../recoil/CartItem/atoms/selectedCartItemListState';
import { selectedCartItemListTotalCountSelector } from '../../recoil/CartItem/selectors/selectedCartItemListTotalCountSelector';
import { selectedCartItemListTotalPriceSelector } from '../../recoil/CartItem/selectors/selectedCartItemListTotalPriceSelector';
import * as S from './PaymentConfirmPage.style';

function PaymentConfirmPage() {
  const selectedItemList = useRecoilValue(selectedCartItemListState);

  const selectedCartItemTotalCount = useRecoilValue(selectedCartItemListTotalCountSelector);

  const selectedCartItemTotalPrice = useRecoilValue(selectedCartItemListTotalPriceSelector);

  const { selectedCouponTotalDiscount } = useCalculateTotalCouponDiscount();

  const { deliveryFee } = useCalculateDeliveryFee();

  const totalPrice = selectedCartItemTotalPrice + deliveryFee - selectedCouponTotalDiscount;

  if (totalPrice <= 0) {
    return <Navigate to={PATHS.ERROR} />;
  }

  return (
    <div>
      <Header />
      <S.Layout>
        <TitleContainer title="주문 확인" />
        <S.OrderDetailText>
          총 {selectedItemList.length}종류의 상품 {selectedCartItemTotalCount}개를 주문합니다.
          <br />
          최종 결제 금액을 확인해주세요.
        </S.OrderDetailText>
        <S.TotalPriceContainer>
          <S.TotalPriceTitle>총 결제 금액</S.TotalPriceTitle>
          <S.TotalPriceValue>{totalPrice.toLocaleString()}원</S.TotalPriceValue>
        </S.TotalPriceContainer>
      </S.Layout>
      <Link to={PATHS.ROOT}>
        <SubmitButton isActive={true} content="장바구니로 돌아가기" />
      </Link>
    </div>
  );
}

export default PaymentConfirmPage;
