import * as S from "./PaymentConfirmPage.style";
import { useRecoilValue, useResetRecoilState } from "recoil";

import Button from "@/components/_common/Button/Button";

import {
  totalItemOrderCountSelector,
  totalItemsPriceSelector,
} from "@/recoil/orderInformation";
import { CART_PAGE_MESSAGES } from "@/constants/cart";
import { formatToWon } from "@/utils/stringHelper";
import { selectedCartItemsIdState } from "@/recoil/selectedCardItems";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/constants/url";
import TextBox from "@/components/_common/TextBox/TextBox";
import { shippingFeeSelector } from "@/recoil/shippingFeeType";
import { SHIPPING_FEE } from "@/constants/shippingInfo.ts";
import { COUPON_ORDER_MESSAGE } from "@/constants/couponAndOrder.ts";
import { CAPTION } from "@/constants/titleAndCaption.ts";
import MainLayout from "@/components/layout/MainLayout.tsx";
import { couponsState } from "@/recoil/coupons";
import { useEffect } from "react";

const PaymentConfirmPage = () => {
  const navigate = useNavigate();
  const shippingFeeType = useRecoilValue(shippingFeeSelector);
  const totalOrderPrice = useRecoilValue(totalItemsPriceSelector);

  const totalPrice = SHIPPING_FEE[shippingFeeType] + totalOrderPrice;

  const totalItemsCount = useRecoilValue(totalItemOrderCountSelector);
  const selectedItemsId = useRecoilValue(selectedCartItemsIdState);

  const resetCoupons = useResetRecoilState(couponsState);
  const resetShippingFee = useResetRecoilState(shippingFeeSelector);

  useEffect(() => {
    resetCoupons();
    resetShippingFee();
  }, []);

  const onMoveCartPage = () => {
    navigate(PAGE_URL.home);
  };

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
                selectedItemsId.length,
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
