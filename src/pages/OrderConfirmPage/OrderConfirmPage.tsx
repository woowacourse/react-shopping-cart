import { useState } from "react";

import { CART_PAGE_CAPTION, CART_PAGE_MESSAGES } from "@/constants/cart";

import { totalItemOrderCountSelector } from "@/recoil/orderInformation";
import { selectedCartItemsIdState } from "@/recoil/selectedCardItems";
import { useRecoilValue } from "recoil";

import TitleSet from "@/components/_common/TitleSet/TitleSet";
import ProductList from "@/components/ProductList/ProductList";
import Button from "@/components/_common/Button/Button";
import TextBox from "@/components/_common/TextBox/TextBox";
import CheckBox from "@/components/_common/CheckBox/CheckBox";

import * as S from "./OrderConfirmPage.style";
import MoreInfo from "@/assets/more-info.svg?react";
import PriceSection from "@/components/PriceSection/PriceSection";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/constants/url";

const OrderConfirmPage = () => {
  const totalItemsCount = useRecoilValue(totalItemOrderCountSelector);
  const selectedItemsId = useRecoilValue(selectedCartItemsIdState);

  const [isDoubleShippingFee, setIsDoubleShippingFee] = useState(false);

  const navigate = useNavigate();

  const onClickDoubleShippingFee = () => {
    setIsDoubleShippingFee((prev) => !prev);
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
                type="caption"
                text={CART_PAGE_MESSAGES.orderInfo(
                  selectedItemsId.length,
                  totalItemsCount
                )}
              />
              <TextBox
                type="caption"
                text={CART_PAGE_MESSAGES.askOrderConfirm}
              />
            </>
          }
        />

        <S.CartItemListWrapper>
          <ProductList type="readonly" />
        </S.CartItemListWrapper>

        <Button radiusVariant="rounded">쿠폰 적용</Button>

        <S.ShippingInfoBox>
          <TextBox type="subTitle" text="배송 정보" />
          <S.FlexBox>
            <CheckBox
              isChecked={isDoubleShippingFee}
              onClick={onClickDoubleShippingFee}
            />
            <TextBox type="caption" text="제주도 및 도서 산간 지역" />
          </S.FlexBox>
        </S.ShippingInfoBox>

        <TextBox
          type="caption"
          asset={() => <MoreInfo />}
          text={CART_PAGE_MESSAGES.freeShippingInfo}
        />
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
    </>
  );
};

export default OrderConfirmPage;
