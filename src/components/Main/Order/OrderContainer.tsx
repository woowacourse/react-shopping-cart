import { useRecoilValue } from "recoil";

import { cartItemsCounts, totalAmountState } from "@/store/selector/selectors";
import { cartState } from "@/store/atom/atoms";

import { orderContainerStyle, orderDescriptionStyle, orderTitleStyle } from "./OrderContainer.style";
import PaymentDetail from "@/components/PaymentDetail/PaymentDetail";

const OrderContainer = () => {
  const totalAmount = useRecoilValue(totalAmountState);
  const itemCount = useRecoilValue(cartState).length;

  const counts = useRecoilValue(cartItemsCounts);

  const orderInfoContent = `총 ${itemCount}종류의 상품 ${counts}개를 주문합니다.
  최종 결제 금액을 확인해 주세요.`;

  return (
    <div css={orderContainerStyle}>
      <div css={orderTitleStyle}>주문 확인</div>
      <div css={orderDescriptionStyle}>{orderInfoContent}</div>
      <PaymentDetail directionStyle="column" title="총 결제 금액" amount={totalAmount} />
    </div>
  );
};

export default OrderContainer;
