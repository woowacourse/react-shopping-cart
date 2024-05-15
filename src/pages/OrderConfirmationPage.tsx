import React from "react";
import { css } from "@emotion/css";
import { useRecoilValue } from "recoil";
import { cartItemCheckedIdsAtom, cartItemsAtom } from "../recoil/atom";
import { totalCountSelector, totalPriceSelector } from "../recoil/selector";
import { formatCurrency } from "../utils/formatCurrency";

const OrderConfirmationPage = () => {
  const cartItemCheckedIds = useRecoilValue(cartItemCheckedIdsAtom);
  const cartTotalPrice = useRecoilValue(totalPriceSelector);
  const cartTotalCount = useRecoilValue(totalCountSelector);

  return (
    <div>
      <div className={headerCSS}>주문 확인</div>
      <div>
        총 {cartItemCheckedIds.length}종류의 상품 {cartTotalCount}개를 주문합니다.
      </div>
      <div>최종 결제 금액을 확인해 주세요.</div>

      <div>총 결제 금액</div>
      <div> {formatCurrency(cartTotalPrice)}</div>
    </div>
  );
};

export default OrderConfirmationPage;

const headerCSS = css`
  font-family: Noto Sans KR;
  font-size: 24px;
  font-weight: 700;
  line-height: 34.75px;
  text-align: left;
`;
