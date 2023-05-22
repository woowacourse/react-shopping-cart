import { useRecoilValue } from 'recoil';
import { selectedCartItemTotal } from 'src/recoil/cartList';
import { convertKORWon } from 'src/utils';
import { DELIVERY_COST } from 'src/utils/constants';
import * as S from './OrderInfo.styles';

const OrderInfo = () => {
  const totalCartItemPrice = useRecoilValue(selectedCartItemTotal);

  const isEmptyBasket = totalCartItemPrice === 0;

  const totalPrice = isEmptyBasket ? 0 : totalCartItemPrice + DELIVERY_COST;

  return (
    <S.OrderWrapper>
      <S.OrderTitleContainer>
        <p>결제 예상 금액</p>
      </S.OrderTitleContainer>
      <S.OrderInfoContainer>
        <div>
          <p>총 상품 가격</p>
          <p>{convertKORWon(totalCartItemPrice)}</p>
        </div>
        <div>
          <p>총 배송비</p>
          <p>{convertKORWon(isEmptyBasket ? 0 : DELIVERY_COST)}</p>
        </div>
        <div>
          <p>총 주문 금액</p>
          <p>{convertKORWon(totalPrice)}</p>
        </div>
      </S.OrderInfoContainer>
      <S.OrderButtonContainer>
        <button disabled={isEmptyBasket}>주문하기</button>
      </S.OrderButtonContainer>
    </S.OrderWrapper>
  );
};

export default OrderInfo;
