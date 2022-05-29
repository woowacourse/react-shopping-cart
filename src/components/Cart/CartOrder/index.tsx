import { useTheme } from "@emotion/react";
import { themeType } from "../../../ThemeProvider";
import Button from "../../@shared/Button";
import * as S from "./index.styles";

interface CartOrderProps {
  itemAmount: number;
  price: number;
}

const CartOrder = ({ itemAmount, price }: CartOrderProps) => {
  const {
    color: { primary, white },
  } = useTheme() as themeType;

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
      <Button
        disabled={itemAmount > 0}
        css={S.OrderButtonStyle}
      >{`주문하기(${itemAmount}개)`}</Button>
      {/* <S.OrderButton
        buttonColor={buttonColor}
      >{`주문하기(${itemAmount}개)`}</S.OrderButton> */}
    </S.CartOrderContainer>
  );
};

export default CartOrder;
