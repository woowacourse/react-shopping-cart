import { useState } from "react";

import { CART_PAGE_MESSAGES } from "@/constants/cart";

import {
  totalItemOrderCountSelector,
  totalItemsPriceSelector,
} from "@/recoil/orderInformation";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import TitleSet from "@/components/_common/TitleSet/TitleSet";
import ProductList from "@/components/cart/ProductList/ProductList";
import Button from "@/components/_common/Button/Button";
import TextBox from "@/components/_common/TextBox/TextBox";
import CheckBox from "@/components/_common/CheckBox/CheckBox";
import * as S from "./OrderConfirmPage.style";
import PriceSection from "@/components/cart/PriceSection/PriceSection";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/constants/url";
import MoreInfo from "@/components/_common/MoreInfo/MoreInfo";
import {
  shippingFeeSelector,
  shippingFeeState,
} from "@/recoil/shippingFeeType";
import CouponModal from "../CouponModal/CouponModal";
import { CartItem } from "@/types/cart";
import { CAPTION } from "@/constants/titleAndCaption.ts";
import { COUPON_ORDER_MESSAGE } from "@/constants/couponAndOrder.ts";
import { SHIPPING_FEE, SHIPPING_MESSSAGES } from "@/constants/shippingInfo.ts";
import { postOrder } from "@/apis/order";
import useCoupons from "@/hooks/coupon/useCoupons";
import useSelectedItems from "@/hooks/cart/useSelectedItems";
import { getLocalStorage } from "@/utils/localStorage";
import { discountCouponPriceState } from "@/recoil/coupons";

const OrderConfirmPage = ({
  selectedCartItems,
}: {
  selectedCartItems: CartItem[];
}) => {
  const totalOrderPrice = useRecoilValue(totalItemsPriceSelector);
  const totalItemsCount = useRecoilValue(totalItemOrderCountSelector);
  const shippingFeeType = useRecoilValue(shippingFeeSelector);
  const totalDiscountAmount = useRecoilValue(discountCouponPriceState);
  const setShippingFeeType = useSetRecoilState(shippingFeeState);
  const resetShippingFee = useResetRecoilState(shippingFeeSelector);

  const { resetCouponList } = useCoupons();
  const { resetSelectedItems } = useSelectedItems();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedItemsId = getLocalStorage("selectedItems");

  const navigate = useNavigate();

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const onClickDoubleShippingFee = () => {
    shippingFeeType === "remoteAreaShippingFee"
      ? setShippingFeeType("basic")
      : setShippingFeeType("remoteAreaShippingFee");
  };

  const onMovePaymentConfirmPage = async () => {
    await postOrder(selectedItemsId);

    navigate(PAGE_URL.paymentConfirm, {
      state: {
        totalPrice:
          SHIPPING_FEE[shippingFeeType] + totalOrderPrice - totalDiscountAmount,
        selectedItemsCount: selectedItemsId.length,
        totalItemsCount: totalItemsCount,
      },
    });

    resetCouponList();
    resetShippingFee();
    resetSelectedItems();
  };

  return (
    <>
      <S.Wrapper>
        <TitleSet
          title={CAPTION.orderConfirm}
          subTitle={
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
          }
        />

        <S.CartItemListWrapper>
          <ProductList type="readonly" productList={selectedCartItems} />
        </S.CartItemListWrapper>

        <Button
          radiusVariant="rounded"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          쿠폰 적용
        </Button>

        <S.ShippingInfoBox>
          <TextBox type="small" text="배송 정보" />
          <S.FlexBox>
            <CheckBox
              isChecked={shippingFeeType === "remoteAreaShippingFee"}
              onClick={onClickDoubleShippingFee}
            />
            <TextBox type="xSmall" text="제주도 및 도서 산간 지역" />
          </S.FlexBox>
        </S.ShippingInfoBox>
        <MoreInfo text={SHIPPING_MESSSAGES.freeShippingInfo} />

        <PriceSection isApplyCoupon={true} />
      </S.Wrapper>

      <Button
        size="large"
        position="bottom"
        width="full"
        theme="dark"
        disabled={false}
        onClick={onMovePaymentConfirmPage}
      >
        {CAPTION.pay}
      </Button>
      <CouponModal onCloseModal={onCloseModal} isOpen={isModalOpen} />
    </>
  );
};

export default OrderConfirmPage;
