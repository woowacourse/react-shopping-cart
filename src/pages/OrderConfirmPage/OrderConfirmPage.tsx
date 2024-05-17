import { useRecoilValue } from 'recoil';
import { Navigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import TitleContainer from '../../components/Container/TitleContainer/TitleContainer';
import SubmitButton from '../../components/Button/SubmitButton/SubmitButton';
import { selectedCartItemListState } from '../ShoppingCartPage/recoil/atom/selectedCartItemListState';
import { selectedCartItemListTotalPriceSelector } from '../ShoppingCartPage/recoil/selector/selectedCartItemListTotalPriceSelector';
import { selectedCartItemListTotalCountSelector } from '../ShoppingCartPage/recoil/selector/selectedCartItemListTotalCountSelector';
import { calculateDeliveryFee } from '../../utils/calculateDeliveryFee';
import { PATHS } from '../../constants/PATHS';
import * as S from './OrderConfirmPage.style';

function OrderConfirmPage() {
  const selectedItemList = useRecoilValue(selectedCartItemListState);

  const selectedCartItemTotalPrice = useRecoilValue(selectedCartItemListTotalPriceSelector);
  const selectedCartItemTotalCount = useRecoilValue(selectedCartItemListTotalCountSelector);

  if (selectedItemList.length === 0) {
    return <Navigate to={PATHS.ERROR} />;
  }

  const totalPrice = selectedCartItemTotalPrice + calculateDeliveryFee(selectedCartItemTotalPrice);

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
      <SubmitButton isActive={false} content="결제하기" />
    </div>
  );
}

export default OrderConfirmPage;
