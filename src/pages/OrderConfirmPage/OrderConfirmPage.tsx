import { useRecoilValue } from 'recoil';
import { Navigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import TitleContainer from '../../components/common/TitleContainer/TitleContainer';
import SubmitButton from '../../components/common/SubmitButton/SubmitButton';
import { selectedCartItemListState } from '../../recoil/atoms/atoms';
import { cartOrderTotalPriceSelector, cartOrderTotalCountSelector } from '../../recoil/selectors/selectors';
import { calculateDeliveryFee } from '../../utils/calculateDeliveryFee';
import { PATHS } from '../../constants/PATHS';
import * as S from './OrderConfirmPage.style';

function OrderConfirmPage() {
  const selectedItemList = useRecoilValue(selectedCartItemListState);

  const orderTotalPrice = useRecoilValue(cartOrderTotalPriceSelector);
  const orderTotalCount = useRecoilValue(cartOrderTotalCountSelector);

  if (selectedItemList.length === 0) {
    return <Navigate to={PATHS.ERROR} />;
  }

  const paymentTotalPrice = orderTotalPrice + calculateDeliveryFee(orderTotalPrice);

  return (
    <div>
      <Header />
      <S.Layout>
        <TitleContainer title="주문 확인" />
        <S.OrderDetailText>
          총 {selectedItemList.length}종류의 상품 {orderTotalCount}개를 주문합니다.
          <br />
          최종 결제 금액을 확인해주세요.
        </S.OrderDetailText>
        <S.TotalPriceContainer>
          <S.TotalPriceTitle>총 결제 금액</S.TotalPriceTitle>
          <S.TotalPriceValue>{paymentTotalPrice.toLocaleString()}원</S.TotalPriceValue>
        </S.TotalPriceContainer>
      </S.Layout>
      <SubmitButton isActive={false} content="결제하기" />
    </div>
  );
}

export default OrderConfirmPage;
