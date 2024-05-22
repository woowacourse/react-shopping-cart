import { css } from "@emotion/css";
import { useRecoilValue } from "recoil";
import { orderPriceSelector, shippingFeeSelector, totalPriceSelector } from "../../recoil/selector/selector";
import { formatCurrency } from "../../utils/formatCurrency";

import { Information, LabelValue, Splitter } from "../default";

const PaymentSummary = () => {
  const orderPrice = useRecoilValue(orderPriceSelector);
  const shippingFee = useRecoilValue(shippingFeeSelector);
  const totalPrice = useRecoilValue(totalPriceSelector);

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
        value={`-2,000원`}
      />
      <LabelValue
        label="배송비"
        value={formatCurrency(shippingFee)}
      />
      <Splitter />
      <LabelValue
        label="총 결제금액"
        value={formatCurrency(totalPrice)}
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
