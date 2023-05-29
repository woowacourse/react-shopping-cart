import { memo } from "react";
import Styled from "./ShoppingPreviewStyled";
import ProductPrice from "../ProductPrice/ProductPrice";
import { cartAllPriceSelector } from "../../store/cartState";
import { useRecoilValue } from "recoil";
import { MONEY } from "../../abstract/constants";

const ShoppingPreview = () => {
  const cartAllPrice = useRecoilValue(cartAllPriceSelector);

  return (
    <Styled.Container>
      <Styled.TopSection>결제예상금액</Styled.TopSection>
      <Styled.Border />
      <Styled.PriceSection>
        <div>
          <Styled.PriceLine>
            <Styled.TextSpan>총 상품가격</Styled.TextSpan>
            <ProductPrice theme={priceTheme} price={cartAllPrice} />
          </Styled.PriceLine>
          <Styled.PriceLine>
            <Styled.TextSpan>총 배송비</Styled.TextSpan>
            <ProductPrice
              price={cartAllPrice ? MONEY.DELIVERY : MONEY.ZERO}
              theme={priceTheme}
            />
          </Styled.PriceLine>
        </div>

        <Styled.PaymentSection>
          <Styled.PriceLine>
            <Styled.TextSpan>총 주문금액</Styled.TextSpan>
            <ProductPrice
              price={cartAllPrice ? cartAllPrice + MONEY.DELIVERY : MONEY.ZERO}
              theme={priceTheme}
            />
          </Styled.PriceLine>
          <Styled.Button> 주문하기</Styled.Button>
        </Styled.PaymentSection>
      </Styled.PriceSection>
    </Styled.Container>
  );
};

const priceTheme = {
  alignSelf: "auto",
  fontWeight: "Bold",
  fontSize: "20px",
};

export default memo(ShoppingPreview);
