/** @jsxImportSource @emotion/react */

import { useRecoilValue } from "recoil";
import { orderContainerStyle, orderDescriptionStyle, orderTitleStyle } from "./OrderContainer.style";

import { useEffect, useState } from "react";
import { fetchCartItemsCounts } from "../../store/api";
import { itemIdsState } from "../../store/atom/atoms";
import { totalAmountState } from "../../store/selector/selectors";
import PaymentDetail from "../PaymentDetail/PaymentDetail";

const OrderContainer = () => {
  const totalAmount = useRecoilValue(totalAmountState);
  const ids = useRecoilValue(itemIdsState);

  const [cartItemsCounts, setCartItemsCounts] = useState(0);

  useEffect(() => {
    fetchCartItemsCounts().then((counts) => setCartItemsCounts(counts));
  }, []);

  const orderInfoContent = `총 ${ids.length}종류의 상품 ${cartItemsCounts}개를 주문합니다.
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
