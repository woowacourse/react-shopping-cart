import React from "react";
import { INFO_MESSAGES } from "../../../constants";
import { InfoDescription } from "../../infoDescription/InfoDescription";
import { BaseSummaryItem } from "../baseSummaryItem/BaseSummaryItem";
import {
  StyledBaseSummaryDetailPrice,
  StyledBaseSummaryTotalContainer,
  StyledBaseSummaryTotalPrice,
} from "./BaseSummary.styled";

interface BaseSummaryProps {
  orderPrice: number;
  deliveryPrice: number;
  totalPrice: number;
  showCouponDiscount?: boolean;
  couponDiscountPrice?: string;
}

const BaseSummary: React.FC<BaseSummaryProps> = ({
  orderPrice,
  deliveryPrice,
  totalPrice,
  showCouponDiscount = false,
  couponDiscountPrice = 0,
}) => {
  return (
    <>
      <InfoDescription text={INFO_MESSAGES.FREE_DELIVERY} />
      <StyledBaseSummaryTotalContainer>
        <StyledBaseSummaryDetailPrice>
          <BaseSummaryItem title="주문 금액" price={orderPrice} />
          {showCouponDiscount && (
            <BaseSummaryItem title="쿠폰 할인 금액" price={couponDiscountPrice} />
          )}
          <BaseSummaryItem title="배송비" price={deliveryPrice} />
        </StyledBaseSummaryDetailPrice>
        <StyledBaseSummaryTotalPrice>
          <BaseSummaryItem title="총 결제 금액" price={totalPrice} />
        </StyledBaseSummaryTotalPrice>
      </StyledBaseSummaryTotalContainer>
    </>
  );
};

export default BaseSummary;
