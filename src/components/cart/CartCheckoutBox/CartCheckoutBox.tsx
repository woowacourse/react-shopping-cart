import { useRecoilValueLoadable } from 'recoil';

import { SHIPPING_FEE } from '../../../constants';
import { cartListSubTotalState } from '../../../store/cart';
import { priceFormatter } from '../../../utils/formatter';
import Button from '../../common/Button/Button';
import { Text } from '../../common/Text/Text.styles';
import * as S from './CartCheckoutBox.styles';

const CartCheckoutBox = () => {
  const cartListSubTotal = useRecoilValueLoadable(cartListSubTotalState);
  const totalPrice = cartListSubTotal.contents + SHIPPING_FEE;

  return (
    <S.CartCheckoutBoxWrapper>
      <S.CheckoutInformationContainer>
        <S.CheckoutInformationTextContainer>
          <Text>총 상품 가격</Text>
          <S.CheckoutValueText>
            {(cartListSubTotal.state === 'hasValue' && priceFormatter(cartListSubTotal.contents)) ||
              0}
            원
          </S.CheckoutValueText>
        </S.CheckoutInformationTextContainer>
        <S.CheckoutInformationTextContainer>
          <Text>총 배송비</Text>
          <S.CheckoutValueText>
            {cartListSubTotal.state === 'hasValue' && cartListSubTotal.contents > 0
              ? priceFormatter(SHIPPING_FEE)
              : 0}
            원
          </S.CheckoutValueText>
        </S.CheckoutInformationTextContainer>
        <S.CheckoutTotalPriceContainer>
          <Text>결제 예상 금액</Text>
          <S.CheckoutTotalPriceValueText>
            {(cartListSubTotal.state === 'hasValue' && priceFormatter(totalPrice)) || 0}원
          </S.CheckoutTotalPriceValueText>
        </S.CheckoutTotalPriceContainer>
        <Button variant="primary">주문하기</Button>
      </S.CheckoutInformationContainer>
    </S.CartCheckoutBoxWrapper>
  );
};

export default CartCheckoutBox;
