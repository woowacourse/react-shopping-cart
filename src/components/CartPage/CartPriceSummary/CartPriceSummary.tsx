import { useRecoilValue } from 'recoil';
import { cartListAtom, cartTotalPriceSelector } from '../../../stores/cartItemsStore';
import * as Styled from './CartPriceSummary.styles';

const CartPriceSummary = () => {
  const cartList = useRecoilValue(cartListAtom);
  const cartPrice = useRecoilValue(cartTotalPriceSelector);
  const shippingPrice = cartPrice === 0 ? 0 : 3000;

  return (
    <>
      {cartList.length !== 0 && (
        <Styled.Wrapper>
          <Styled.Title>결제예상금액</Styled.Title>
          <Styled.Content>
            <Styled.PriceInfoWrapper>
              <Styled.PriceInfo>
                <span>총 상품가격</span>
                <span>{cartPrice.toLocaleString()}원</span>
              </Styled.PriceInfo>
              <Styled.PriceInfo>
                <span>총 배송비</span>
                <span>{shippingPrice.toLocaleString()}원</span>
              </Styled.PriceInfo>
            </Styled.PriceInfoWrapper>
            <Styled.PriceInfo>
              <span>총 주문금액</span>
              <span>{(cartPrice + shippingPrice).toLocaleString()}원</span>
            </Styled.PriceInfo>
            <Styled.OrderButton type='button'>주문하기</Styled.OrderButton>
          </Styled.Content>
        </Styled.Wrapper>
      )}
    </>
  );
};

export default CartPriceSummary;
