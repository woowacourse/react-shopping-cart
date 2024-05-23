import { useState } from "react";

import { CART_PAGE_CAPTION, CART_PAGE_MESSAGES } from "@/constants/cart";

import { totalItemOrderCountSelector } from "@/recoil/orderInformation";
import { selectedCartItemsIdState } from "@/recoil/selectedCardItems";
import { useRecoilValue } from "recoil";

import TitleSet from "@/components/_common/TitleSet/TitleSet";
import ProductList from "@/components/cart/ProductList/ProductList";
import Button from "@/components/_common/Button/Button";
import TextBox from "@/components/_common/TextBox/TextBox";
import CheckBox from "@/components/_common/CheckBox/CheckBox";

import * as S from "./OrderConfirmPage.style";

import PriceSection from "@/components/cart/PriceSection/PriceSection";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/constants/url";
import CouponModal from "@/components/modal/CouponModal/CouponModal";
import MoreInfo from "@/components/_common/MoreInfo/MoreInfo";
import useCalculateShippingFee from "@/hooks/useCalculateShippingFee";

const OrderConfirmPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onCloseModal = () => {
    setIsModalOpen(false);
  };
  const totalItemsCount = useRecoilValue(totalItemOrderCountSelector);
  const selectedItemsId = useRecoilValue(selectedCartItemsIdState);

  const { shippingFee, shippingFeeType, setShippingFeeType } =
    useCalculateShippingFee();

  const navigate = useNavigate();

  const onClickDoubleShippingFee = () => {
    shippingFeeType === "DOUBLE"
      ? setShippingFeeType("BASIC")
      : setShippingFeeType("DOUBLE");
  };

  const onMovePaymentConfirmPage = () => {
    navigate(PAGE_URL.paymentConfirm);
  };

  return (
    <>
      <S.Wrapper>
        <TitleSet
          title={CART_PAGE_CAPTION.orderConfirm}
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
                text={CART_PAGE_MESSAGES.askOrderConfirm}
              />
            </>
          }
        />

        <S.CartItemListWrapper>
          <ProductList type="readonly" />
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
              isChecked={shippingFeeType === "DOUBLE"}
              onClick={onClickDoubleShippingFee}
              disabled={shippingFee === 0}
            />
            <TextBox
              type="xSmall"
              text="제주도 및 도서 산간 지역"
              disabled={shippingFee === 0}
            />
          </S.FlexBox>
        </S.ShippingInfoBox>
        <MoreInfo text={CART_PAGE_MESSAGES.freeShippingInfo} />

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
        {CART_PAGE_CAPTION.pay}
      </Button>
      <CouponModal onCloseModal={onCloseModal} isOpen={isModalOpen} />
    </>
  );
};

export default OrderConfirmPage;
