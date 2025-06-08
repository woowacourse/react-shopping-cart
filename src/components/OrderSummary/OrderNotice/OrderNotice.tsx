import * as Styled from "./OrderNotice.style";
import notice from "/notice.svg";
import { FREE_SHIPPING_OVER } from "../../../constants/priceSetting";

function OrderNotice() {
  return (
    <Styled.Notice>
      <Styled.NoticeIcon src={notice} />
      <Styled.FreeShippingText>
        총 주문 금액이 {FREE_SHIPPING_OVER.toLocaleString()}원 이상일 경우 무료
        배송됩니다.
      </Styled.FreeShippingText>
    </Styled.Notice>
  );
}

export default OrderNotice;
