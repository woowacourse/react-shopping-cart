import { totalPriceSelector } from '../../../atoms/cart';
import { useRefreshableRecoilValue } from '../../../hooks/common/useRefreshableAtom';
import { Button } from '../../common/Button/Button.styles';
import * as S from './OrderAside.styles';

const OrderSection = () => {
  const totalPrice = useRefreshableRecoilValue(totalPriceSelector);
  return (
    <S.Root>
      <S.Title>결제예상금액</S.Title>
      <S.TextWrapper>
        <S.Text>총 상품가격</S.Text>
        <S.Text>20000원</S.Text>
      </S.TextWrapper>
      <S.TextWrapper>
        <S.Text>총 배송비</S.Text>
        <S.Text>20000원</S.Text>
      </S.TextWrapper>
      <S.TextWrapper>
        <S.Text>총 주문금액</S.Text>
        <S.Text>20000원</S.Text>
      </S.TextWrapper>
      <Button size="L" view="black">
        주문하기
      </Button>
    </S.Root>
  );
};

export default OrderSection;
