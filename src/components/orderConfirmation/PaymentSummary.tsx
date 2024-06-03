import { useRecoilValue } from "recoil";
import { css } from "@emotion/css";

import { couponUsedAtom } from "../../recoil/atom/atom";
import { orderPriceSelector, shippingFeeSelector } from "../../recoil/selector/selector";
import { useCartCalculator } from "../../hooks/useCartCalculator/useCartCalculator";
import { Information, LabelValue, Splitter } from "../default";
import { formatCurrency } from "../../utils/formatCurrency";

const PaymentSummary = () => {
  const orderPrice = useRecoilValue(orderPriceSelector);
  const shippingFee = useRecoilValue(shippingFeeSelector);
  const couponUsed = useRecoilValue(couponUsedAtom);
  const { calculateCouponTotal, calculateTotalWithCoupon } = useCartCalculator();

  return (
    <div className={PaymentSummaryCSS}>
      <Information title="총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다."></Information>
      <Splitter />
      <LabelValue
        label="주문 금액"
        value={formatCurrency(orderPrice)}
      />
      <LabelValue
        label="쿠폰 할인 금액"
        value={formatCurrency(couponUsed ? -calculateCouponTotal() : -0)}
      />
      <LabelValue
        label="배송비"
        value={formatCurrency(shippingFee)}
      />
      <Splitter />
      <LabelValue
        label="총 결제금액"
        value={formatCurrency(calculateTotalWithCoupon())}
      />
    </div>
  );
};

export default PaymentSummary;

const PaymentSummaryCSS = css`
  display: flex;
  flex-direction: column;
  gap: 13px;
`;
