import CartItem from '../CartItem/CartItem';
import InfoIcon from '../icons/Info';
import Spacing from '../Spacing/Spacing';
import Text from '../Text/Text';
import * as S from './ShoppingCartSection.styles';

export default function ShoppingCartSection() {
  return (
    <S.ShoppingCartSection>
      <Text variant="title-1">장바구니</Text>
      <Spacing size={8} />
      <Text variant="body-2">현재 2종류의 상품이 담겨있습니다.</Text>
      <Spacing size={32} />
      <CartItem />

      <p>
        <InfoIcon /> 총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
      </p>
      <hr />
      <S.ReceiptTextWrapper>
        <Text variant="title-2">주문 금액</Text>
        <Text variant="title-1">70,000원</Text>
      </S.ReceiptTextWrapper>
      <S.ReceiptTextWrapper>
        <Text variant="title-2">배송비</Text>
        <Text variant="title-1">3,000원</Text>
      </S.ReceiptTextWrapper>
      <S.ReceiptTextWrapper>
        <Text variant="title-2">총 결제 금액</Text>
        <Text variant="title-1">73,000원</Text>
      </S.ReceiptTextWrapper>
    </S.ShoppingCartSection>
  );
}
//
