<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { CartLayout } from "../../components/cartLayout/CartLayout";
import { ContentHeader } from "../../components/contentHeader/ContentHeader";
import { OrderContentSection } from "../../components/orderContentSection/OrderContentSection";
import { BUTTON_COLORS, CART, HEADER_TYPES, PATHS } from "../../constants";
import {
  cartSummarySelectorState,
  selectedCartItemsSelectorState,
} from "../../recoil/selector/selector";

export const OrderConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const selectedCartItems = useRecoilValue(selectedCartItemsSelectorState);
  const { uniqueItemCount, totalItemCount } = useRecoilValue(cartSummarySelectorState);

  const navigateToPaymentsConfirmationPage = () => {
    navigate(PATHS.PAYMENTS_CONFIRMATION);
  };

  const buttonMode =
    uniqueItemCount === CART.EMPTY_THRESHOLD ? BUTTON_COLORS.LIGHT : BUTTON_COLORS.DARK;

  const description = `총 ${uniqueItemCount}종류의 상품 ${totalItemCount}개를 주문합니다. \n최종 결제 금액을 확인해 주세요.`;

  return (
    <CartLayout
      headerType={HEADER_TYPES.BACK}
      buttonText="결제하기"
      buttonMode={buttonMode}
      onButtonClick={navigateToPaymentsConfirmationPage}
    >
      <ContentHeader title="주문 확인" description={description} />
      <OrderContentSection selectedCartItems={selectedCartItems} />
    </CartLayout>
=======
import { useRecoilValue } from "recoil";
import { ConfirmButton } from "../../components/button";
import Header from "../../components/header/Header";
import { BUTTON_COLORS, HEADER_TYPES, INFO_MESSAGES } from "../../constants";
import { cartSummarySelectorState } from "../../recoil/selector/selector";
import {
  StyledConfirmationPage,
  StyledConfirmationPageDescription,
  StyledConfirmationPagePrice,
  StyledConfirmationPagePriceContainer,
  StyledConfirmationPageSubTitle,
  StyledConfirmationPageTitle,
} from "./OrderConfirmationPage.styled";

export const OrderConfirmationPage: React.FC = () => {
  const { totalPrice, uniqueItemCount, totalItemCount } = useRecoilValue(cartSummarySelectorState);

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
>>>>>>> 00kang
  );
};
