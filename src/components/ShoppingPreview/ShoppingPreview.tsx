import { memo } from "react";
import { ThemeProvider } from "styled-components";
import Styled from "./ShoppingPreviewStyled";
import ProductPrice from "../common/ProductPrice/ProductPrice";
import { cartAllPriceSelector } from "../../store/cartState";
import { useRecoilValue } from "recoil";

const ShoppingPreview = () => {
  const cartAllPrice = useRecoilValue(cartAllPriceSelector);

  return (
    <Styled.Container>
      <Styled.TopSection>결제예상금액</Styled.TopSection>
      <Styled.Border />
      <Styled.PriceSection>
        <ThemeProvider theme={priceTheme}>
          <div>
            <Styled.PriceLine>
              <Styled.TextSpan>총 상품가격</Styled.TextSpan>
              <ProductPrice price={cartAllPrice}></ProductPrice>
            </Styled.PriceLine>
            <Styled.PriceLine>
              <Styled.TextSpan>총 배송비</Styled.TextSpan>
              <ProductPrice price={cartAllPrice ? 3000 : 0}></ProductPrice>
            </Styled.PriceLine>
          </div>

          <Styled.PaymentSection>
            <Styled.PriceLine>
              <Styled.TextSpan>총 주문금액</Styled.TextSpan>
              <ProductPrice
                price={cartAllPrice ? cartAllPrice + 3000 : 0}
              ></ProductPrice>
            </Styled.PriceLine>
            <Styled.Button> 주문하기</Styled.Button>
          </Styled.PaymentSection>
        </ThemeProvider>
      </Styled.PriceSection>
    </Styled.Container>
  );
};

const priceTheme = {
  fontWeight: "Bold",
};

export default memo(ShoppingPreview);
