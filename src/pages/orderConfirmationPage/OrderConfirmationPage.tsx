import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { getCartItemCounts } from "../../api";
import { ConfirmButton } from "../../components/button/confirmButton/ConfirmButton";
import Header from "../../components/header/Header";
import { BUTTON_COLORS, ERROR_MESSAGES, HEADER_TYPES, INFO_MESSAGES } from "../../constants";
import { totalItemCountState } from "../../recoil/atoms/atoms";
import { uniqueItemCountState, totalPriceState } from "../../recoil/selector/selector";
import {
  StyledConfirmationPage,
  StyledConfirmationPageDescription,
  StyledConfirmationPagePrice,
  StyledConfirmationPagePriceContainer,
  StyledConfirmationPageSubTitle,
  StyledConfirmationPageTitle,
} from "./OrderConfirmationPage.styled";

export const OrderConfirmationPage: React.FC = () => {
  const totalPrice = useRecoilValue(totalPriceState);
  const uniqueItemCount = useRecoilValue(uniqueItemCountState);
  const [totalItemCount, setTotalItemCount] = useRecoilState(totalItemCountState);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const { quantity } = await getCartItemCounts();
        setTotalItemCount(quantity);
      } catch (error) {
        console.error(ERROR_MESSAGES.FETCH_CART_ITEMS, error);
      }
    };

    fetchCartItems();
  }, [setTotalItemCount]);

  return (
    <>
      <Header type={HEADER_TYPES.BACK} />
      <StyledConfirmationPage>
        <StyledConfirmationPageTitle>주문확인 </StyledConfirmationPageTitle>
        <StyledConfirmationPageDescription>
          <span>
            총 {uniqueItemCount}종류의 상품 {totalItemCount}개를 주문합니다.
          </span>
          <span>{INFO_MESSAGES.CHECK_TOTAL_PRICE}</span>
        </StyledConfirmationPageDescription>
        <StyledConfirmationPagePriceContainer>
          <StyledConfirmationPageSubTitle>총 결제 금액</StyledConfirmationPageSubTitle>
          <StyledConfirmationPagePrice>{totalPrice.toLocaleString()}원</StyledConfirmationPagePrice>
        </StyledConfirmationPagePriceContainer>
      </StyledConfirmationPage>
      <ConfirmButton text="결제하기" mode={BUTTON_COLORS.LIGHT} />
    </>
  );
};
