import { useRecoilValue } from 'recoil';
import Button from '../../common/Button';
import Flex from '../../common/Flex';
import * as S from './OrderDetail.styles';
import { cartPrice } from '../../../recoil/cart';

const OrderDetail = () => {
  const totalPrice = useRecoilValue(cartPrice);

  return (
    <S.Section>
      <S.Title>결제예상금액</S.Title>
      <S.PriceContainer>
        <S.PriceWrapper>
          <span>총 상품가격</span>
          <span>{totalPrice.toLocaleString()} 원</span>
        </S.PriceWrapper>
        <S.PriceWrapper>
          <span>배송비</span>
          <span>3,000원</span>
        </S.PriceWrapper>
        <S.TotalPrice>
          <span>총 구매금액</span>
          <span>price</span>
        </S.TotalPrice>
        <Button view="dark" size="M">
          주문하기
        </Button>
      </S.PriceContainer>
    </S.Section>
  );
};

export default OrderDetail;
