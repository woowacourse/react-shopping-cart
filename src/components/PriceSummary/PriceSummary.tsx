import { css } from "@emotion/css";
import { FREE_SHIPPING_MIN_AMOUNT } from "../../constants";
import Text from "../@common/Text/Text";
import PriceRow from "../PriceRow/PriceRow";

interface PriceSummaryProps {
  orderPrice: number;
  shippingFee: number;
  couponDiscount?: number;
  totalPrice: number;
}

export const PriceSummary = ({
  orderPrice,
  shippingFee,
  couponDiscount,
  totalPrice,
}: PriceSummaryProps) => {
  return (
    <>
      <div className={InfoRow}>
        <img src="./info-icon.svg" alt="info" />
        <Text
          text={`총 주문 금액이 ${FREE_SHIPPING_MIN_AMOUNT.toLocaleString()}원 이상일 경우 무료 배송됩니다.`}
        />
      </div>
      <hr className={Divider} />
      <PriceRow title="주문 금액" price={orderPrice} testId="order-price" />
      {couponDiscount != null && couponDiscount >= 0 && (
        <PriceRow
          title="쿠폰 할인 금액"
          price={-couponDiscount}
          testId="coupon-price"
        />
      )}
      <PriceRow title="배송비" price={shippingFee} testId="shipping-fee" />
      <hr className={Divider} />
      <PriceRow title="총 결제 금액" price={totalPrice} />
    </>
  );
};

const Divider = css`
  border: 0.5px solid #e0e0e0;
`;

const InfoRow = css`
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 13px 0;
`;
