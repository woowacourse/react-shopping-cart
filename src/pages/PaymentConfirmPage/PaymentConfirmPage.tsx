import { useRecoilValue } from 'recoil';
import Header from '../../components/Header/Header';
import TitleContainer from '../../components/common/TitleContainer/TitleContainer';
import SubmitButton from '../../components/common/SubmitButton/SubmitButton';
import { selectedCartItemListState } from '../../recoil/atoms/atoms';
import {
  cartOrderTotalCountSelector,
  cartOrderTotalPriceSelector,
  deliveryFeeSelector,
} from '../../recoil/selectors/selectors';

import * as S from './PaymentConfirmPage.style';

function PaymentConfirmPage() {
  const selectedItemList = useRecoilValue(selectedCartItemListState);
  const orderTotalPrice = useRecoilValue(cartOrderTotalPriceSelector);
  const orderTotalCount = useRecoilValue(cartOrderTotalCountSelector);
  const deliveryFee = useRecoilValue(deliveryFeeSelector);

  const paymentTotalPrice = orderTotalPrice + deliveryFee;

  return (
    <div>
      <Header />
      <S.Main>
        <TitleContainer title="결제 확인" />
        <S.OrderDetailText>
          총 {selectedItemList.length}종류의 상품 {orderTotalCount}개를 주문했습니다.
          <br />
          최종 결제 금액을 확인해주세요.
        </S.OrderDetailText>
        <S.TotalPriceContainer>
          <S.TotalPriceTitle>총 결제 금액</S.TotalPriceTitle>
          <S.TotalPriceValue>{paymentTotalPrice.toLocaleString()}원</S.TotalPriceValue>
        </S.TotalPriceContainer>
      </S.Main>
      <SubmitButton isActive={true} content="장바구니로 돌아가기" />
    </div>
  );
}

export default PaymentConfirmPage;
