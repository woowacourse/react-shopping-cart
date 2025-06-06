import { useLocation } from "react-router-dom";
import Header from "../../../../layout/Header/Header";
import Main from "../../../../layout/Main/Main";
import { PageLayout } from "../../../../layout/PageLayout/PageLayout";
import {
  bodyText,
  confirmLayout,
  subtitleText,
  titleText,
  totalPriceBox,
} from "./orderConfirm.style";

export function OrderConfirm() {
  const { state } = useLocation();

  return (
    <PageLayout>
      <Header>
        <p>SHOP</p>
      </Header>
      <Main>
        <div css={confirmLayout}>
          <p css={titleText}>주문확인</p>
          <p css={bodyText}>
            총 {state.selectedCartType}종류의 상품 {state.selectedCartItem}개를
            주문합니다. 최종 결제 금액을 확인해 주세요.
          </p>
          <div css={totalPriceBox}>
            <p css={subtitleText}>총 결제금액</p>
            <p css={titleText}>
              {Number(state.totalPrice).toLocaleString("ko")}원
            </p>
          </div>
        </div>
      </Main>
    </PageLayout>
  );
}
