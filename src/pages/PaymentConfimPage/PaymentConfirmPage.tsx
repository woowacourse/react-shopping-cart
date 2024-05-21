import * as S from "./PaymentConfirmPage.style";
import { useRecoilValue } from "recoil";

import Title from "@/components/_common/Title/Title";
import Caption from "@/components/_common/Caption/Caption";
import Button from "@/components/_common/Button/Button";

import {
  shippingFeeSelector,
  totalItemOrderCountSelector,
  totalOrderPriceSelector,
} from "@/recoil/orderInformation";
import { CART_PAGE_MESSAGES, CART_PAGE_CAPTION } from "@/constants/cart";
import { formatToWon } from "@/utils/stringHelper";
import { selectedCartItemsIdState } from "@/recoil/selectedCardItems";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/constants/url";

const PaymentConfirmPage = () => {
  const navigate = useNavigate();
  const totalPrice =
    useRecoilValue(totalOrderPriceSelector) +
    useRecoilValue(shippingFeeSelector);

  const totalItemsCount = useRecoilValue(totalItemOrderCountSelector);
  const selectedItemsId = useRecoilValue(selectedCartItemsIdState);

  const onMoveCartPage = () => {
    navigate(PAGE_URL.home);
  };

  return (
    <S.FlexWrapper>
      <Title text={CART_PAGE_CAPTION.payConfirm} />

      <>
        <Caption
          text={CART_PAGE_MESSAGES.orderInfo(
            selectedItemsId.length,
            totalItemsCount
          )}
        />
        <Caption text={CART_PAGE_MESSAGES.askOrderConfirm} />
      </>

      <S.ButtonText>{CART_PAGE_CAPTION.totalPaymentAmount}</S.ButtonText>
      <Title text={formatToWon(totalPrice)} />

      <Button
        position="bottom"
        size="xLarge"
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
