import { useRecoilValue } from "recoil";
import {
  orderPriceState,
  deliveryFeeState,
  couponDiscountPriceState,
  paymentPriceState,
} from "../../recoil/selectors/selectors";
import { Wrapper, Price } from "./style";
import { MediumText, LargeText } from "../common";
import { useLocation } from "react-router-dom";

export interface PriceStyleProps {
  $borderTop?: string;
}

const CartPrice = () => {
  const location = useLocation();
  const orderPrice = useRecoilValue(orderPriceState);
  const deliveryFee = useRecoilValue(deliveryFeeState);
  const couponDiscountPrice = useRecoilValue(couponDiscountPriceState);
  const paymentPrice = useRecoilValue(paymentPriceState);

  return (
    <Wrapper>
      <Price>
        <MediumText>주문 금액</MediumText>
        <LargeText>{orderPrice.toLocaleString("ko-KR")}원</LargeText>
      </Price>
      {location.pathname === "/order" && (
        <Price>
          <MediumText>쿠폰 할인 금액</MediumText>
          <LargeText>
            {(-couponDiscountPrice || couponDiscountPrice).toLocaleString("ko-KR")}원
          </LargeText>
        </Price>
      )}
      <Price>
        <MediumText>배송비</MediumText>
        <LargeText>{deliveryFee.toLocaleString("ko-KR")}원</LargeText>
      </Price>
      <Price>
        <MediumText>총 결제 금액</MediumText>
        <LargeText>{paymentPrice.toLocaleString("ko-KR")}원</LargeText>
      </Price>
    </Wrapper>
  );
};

export default CartPrice;
