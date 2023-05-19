import { useRecoilValue } from 'recoil';
import { selectedCartItemTotal } from 'src/recoil/cartList';
import { convertKORWon } from 'src/utils';
import { DELEIVERY_COST } from 'src/utils/constants';
import * as S from './OrderInfo.styles';

const OrderInfo = () => {
  const totalCartItemPrice = useRecoilValue(selectedCartItemTotal);

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
          <p>{convertKORWon(DELEIVERY_COST)}</p>
        </div>
        <div>
          <p>총 주문 금액</p>
          <p>{convertKORWon(totalCartItemPrice + DELEIVERY_COST)}</p>
        </div>
      </S.OrderInfoContainer>
      <S.OrderButtonContainer>
        <button>주문하기</button>
      </S.OrderButtonContainer>
    </S.OrderWrapper>
  );
};

export default OrderInfo;
