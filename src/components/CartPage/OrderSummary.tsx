import { css } from "@emotion/css";
import { useRecoilValue } from "recoil";
import Splitter from "../default/Splitter";
import LabelValue from "./LabelValue";
import { formatCurrency } from "../../utils/formatCurrency";
import InfoIcon from "../../assets/InfoIcon.svg?react";
import { orderPriceSelector, shippingFeeSelector, totalPriceSelector } from "../../recoil/cart/orderSummaryState";
import { selectedCouponDiscountPriceSelector } from "../../recoil/coupon/couponState";

const OrderSummary = () => {
  const orderPrice = useRecoilValue(orderPriceSelector);
  const shippingFee = useRecoilValue(shippingFeeSelector);
  const discountPrice = useRecoilValue(selectedCouponDiscountPriceSelector);
  const totalPrice = useRecoilValue(totalPriceSelector);

  return (
    <div className={OrderSummaryCSS}>
      <div className={InfoContainer}>
        <InfoIcon />
        <span className={InfoTextCSS}>총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.</span>
      </div>
      <Splitter />
      <LabelValue label="주문 금액" value={formatCurrency(orderPrice)} />
      <LabelValue label="쿠폰 할인 금액" value={"-" + formatCurrency(discountPrice)} />
      <LabelValue label="배송비" value={formatCurrency(shippingFee)} />
      <Splitter />
      <LabelValue label="총 결제금액" value={formatCurrency(totalPrice)} />
    </div>
  );
};

export default OrderSummary;

const OrderSummaryCSS = css`
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

const InfoContainer = css`
  display: flex;
  gap: 4px;
`;

const InfoTextCSS = css`
  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  text-align: left;
`;
