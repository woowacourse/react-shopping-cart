import * as S from "./PaymentConfirmPage.style";
import Button from "@/components/_common/Button/Button";
import { CART_PAGE_MESSAGES } from "@/constants/cart";
import { formatToWon } from "@/utils/stringHelper";
import { useLocation, useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/constants/url";
import TextBox from "@/components/_common/TextBox/TextBox";
import { COUPON_ORDER_MESSAGE } from "@/constants/couponAndOrder.ts";
import { CAPTION } from "@/constants/titleAndCaption.ts";
import MainLayout from "@/components/layout/MainLayout.tsx";

const PaymentConfirmPage = () => {
  const navigate = useNavigate();
  const orderData = useLocation();

  const onMoveCartPage = () => {
    navigate(PAGE_URL.home);
  };

  const { selectedItemsCount, totalItemsCount, totalPrice } = orderData.state;

  return (
    <MainLayout>
      <MainLayout.TitleHeader text={""} />
      <MainLayout.Body>
        <S.FlexWrapper>
          <TextBox type="xLarge" text={CAPTION.payConfirm} />
          <>
            <TextBox
              type="xSmall"
              text={CART_PAGE_MESSAGES.orderInfo(
                selectedItemsCount,
                totalItemsCount
              )}
            />
            <TextBox
              type="xSmall"
              text={COUPON_ORDER_MESSAGE.askOrderConfirm}
            />
          </>
          <S.ButtonText>{CAPTION.totalPaymentAmount}</S.ButtonText>
          <TextBox type="xLarge" text={formatToWon(totalPrice)} />
          <Button
            position="bottom"
            size="large"
            width="full"
            theme="dark"
            onClick={onMoveCartPage}
          >
            <S.ButtonText>{CAPTION.moveToCartPage}</S.ButtonText>
          </Button>
        </S.FlexWrapper>
      </MainLayout.Body>
    </MainLayout>
  );
};

export default PaymentConfirmPage;
