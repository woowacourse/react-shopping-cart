import { useTheme } from "@emotion/react";
import { themeType } from "../../../ThemeProvider";
import * as S from "./index.styles";

interface CartOrderProps {
  itemAmount: number;
  price: number;
}

const CartOrder = ({ itemAmount, price }: CartOrderProps) => {
  const {
    color: { primary, gray, white },
  } = useTheme() as themeType;

  const buttonColor = itemAmount > 0 ? primary : gray;

  return (
    <S.CartOrderContainer>
      <S.CartOrderTitle>결제예상금액</S.CartOrderTitle>
      <S.PriceContainer>
        <S.Price linearColorFrom={white} linearColorTo={primary}>
          결제예상금액
        </S.Price>
        <S.Price
          linearColorFrom={white}
          linearColorTo={primary}
        >{`${price.toLocaleString("ko-kr")}원`}</S.Price>
      </S.PriceContainer>
      <S.OrderButton
        buttonColor={buttonColor}
      >{`주문하기(${itemAmount}개)`}</S.OrderButton>
    </S.CartOrderContainer>
  );
};

export default CartOrder;
