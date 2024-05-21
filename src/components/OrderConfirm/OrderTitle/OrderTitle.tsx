/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { CartItemIdListState } from "../../../store/atom/atoms";
import { fetchCartItemsCounts } from "../../../store/api";
import { orderDescriptionStyle, orderTitleStyle } from "./OrderTitle.style";

const OrderTitle = () => {
  const ids = useRecoilValue(CartItemIdListState);

  const [cartItemsCounts, setCartItemsCounts] = useState(0);

  useEffect(() => {
    fetchCartItemsCounts().then((counts) => setCartItemsCounts(counts));
  }, []);

  const orderInfoContent = `총 ${ids.length}종류의 상품 ${cartItemsCounts}개를 주문합니다.
  최종 결제 금액을 확인해 주세요.`;

  return (
    <div>
      <h1 css={orderTitleStyle}>주문 확인</h1>
      <div css={orderDescriptionStyle}>{orderInfoContent}</div>
    </div>
  );
};

export default OrderTitle;
