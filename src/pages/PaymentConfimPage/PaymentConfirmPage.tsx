import * as S from "./PaymentConfirmPage.style";
import { useRecoilValue } from "recoil";

import Button from "@/components/_common/Button/Button";

import {
  // shippingFeeSelector,
  totalItemOrderCountSelector,
  totalOrderPriceSelector,
} from "@/recoil/orderInformation";
import {
  CART_PAGE_MESSAGES,
  CART_PAGE_CAPTION,
  SHIPPING_FEE,
} from "@/constants/cart";
import { formatToWon } from "@/utils/stringHelper";
import { selectedCartItemsIdState } from "@/recoil/selectedCardItems";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/constants/url";
import TextBox from "@/components/_common/TextBox/TextBox";
import { shippingFeeSelector } from "@/recoil/shippingFeeType";

const PaymentConfirmPage = () => {
  const navigate = useNavigate();
  const shippingFeeType = useRecoilValue(shippingFeeSelector);
  const totalOrderPrice = useRecoilValue(totalOrderPriceSelector);

  const totalPrice = SHIPPING_FEE[shippingFeeType] + totalOrderPrice;

  const totalItemsCount = useRecoilValue(totalItemOrderCountSelector);
  const selectedItemsId = useRecoilValue(selectedCartItemsIdState);

  const onMoveCartPage = () => {
    navigate(PAGE_URL.home);
  };

  return (
    <S.FlexWrapper>
      <TextBox type="xLarge" text={CART_PAGE_CAPTION.payConfirm} />
      <>
        <TextBox
          type="xSmall"
          text={CART_PAGE_MESSAGES.orderInfo(
            selectedItemsId.length,
            totalItemsCount
          )}
        />
        <TextBox type="xSmall" text={CART_PAGE_MESSAGES.askOrderConfirm} />
      </>
      <S.ButtonText>{CART_PAGE_CAPTION.totalPaymentAmount}</S.ButtonText>
      <TextBox type="xLarge" text={formatToWon(totalPrice)} />
      <Button
        position="bottom"
        size="large"
        width="full"
        theme="dark"
        disabled
        onClick={onMoveCartPage}
      >
        <S.ButtonText>{CART_PAGE_CAPTION.payConfirm}</S.ButtonText>
      </Button>
    </S.FlexWrapper>
  );
};

export default PaymentConfirmPage;
