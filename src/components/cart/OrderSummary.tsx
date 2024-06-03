import { useRecoilValue } from "recoil";
import { css } from "@emotion/css";

import { orderPriceSelector, shippingFeeSelector } from "../../recoil/selector/selector";
import { useCartCalculator } from "../../hooks/useCartCalculator/useCartCalculator";
import { Information, LabelValue, Splitter } from "../default";
import { formatCurrency } from "../../utils/formatCurrency";
import { ORDER_PRICE_THRESHOLD } from "../../constants/setting";

const OrderSummary = () => {
  const orderPrice = useRecoilValue(orderPriceSelector);
  const shippingFee = useRecoilValue(shippingFeeSelector);
  const { calculateCartTotal } = useCartCalculator();

  return (
    <div className={OrderSummaryCSS}>
      <Information title={`총 주문 금액이 ${formatCurrency(ORDER_PRICE_THRESHOLD)} 이상일 경우 무료 배송됩니다.`}></Information>
      <Splitter />
      <LabelValue
        label="주문 금액"
        value={formatCurrency(orderPrice)}
      />
      <LabelValue
        label="배송비"
        value={formatCurrency(shippingFee)}
      />
      <Splitter />
      <LabelValue
        label="총 결제금액"
        value={formatCurrency(calculateCartTotal())}
      />
    </div>
  );
};

export default OrderSummary;

const OrderSummaryCSS = css`
  display: flex;
  flex-direction: column;
  gap: 13px;
`;
