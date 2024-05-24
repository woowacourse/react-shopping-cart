import { Link } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import Header from '../../components/Header/Header';
import TitleContainer from '../../components/common/TitleContainer/TitleContainer';
import SubmitButton from '../../components/common/SubmitButton/SubmitButton';
import { selectedCartItemListState } from '../../recoil/CartItem/atoms/atoms';
import {
  totalOrderPriceSelector,
  totalOrderCountSelector,
  deliveryFeeSelector,
} from '../../recoil/CartItem/selectors/selectors';
import { totalDiscountPriceState } from '../../recoil/Coupon/selectors/selectors';
import { PATHS } from '../../constants/PATHS';
import * as S from './PaymentConfirmPage.style';

function PaymentConfirmPage() {
  const selectedItemList = useRecoilValue(selectedCartItemListState);
  const totalDiscountPrice = useRecoilValue(totalDiscountPriceState);
  const totalOrderPrice = useRecoilValue(totalOrderPriceSelector);
  const totalOrderCount = useRecoilValue(totalOrderCountSelector);
  const deliveryFee = useRecoilValue(deliveryFeeSelector);

  const paymentTotalPrice = totalOrderPrice + deliveryFee - totalDiscountPrice;

  const resetSelectedItemList = useResetRecoilState(selectedCartItemListState);

  const clearStorage = () => resetSelectedItemList();

  return (
    <div>
      <Header />
      <S.Main>
        <TitleContainer title="결제 확인" />
        <S.OrderDetailText>
          총 {selectedItemList.length}종류의 상품 {totalOrderCount}개를 주문했습니다.
          <br />
          최종 결제 금액을 확인해주세요.
        </S.OrderDetailText>
        <S.TotalPriceContainer>
          <S.TotalPriceTitle>총 결제 금액</S.TotalPriceTitle>
          <S.TotalPriceValue>{paymentTotalPrice.toLocaleString()}원</S.TotalPriceValue>
        </S.TotalPriceContainer>
      </S.Main>
      <Link to={PATHS.ROOT} onClick={clearStorage}>
        <SubmitButton isActive={true} content="장바구니로 돌아가기" />
      </Link>
    </div>
  );
}

export default PaymentConfirmPage;
